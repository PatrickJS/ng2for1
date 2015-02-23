(function(angular) {
  var angularModule = angular.module;

  function $Annotation() {
    var annotations = {};

    return {
      asClass: function asClass(componentName, type, componentDefinition) {
        if (!componentDefinition) {
          return angular.bind(this, this.asClass, componentName, type);
        }
        annotations[componentName] = annotations[componentName] || {};
        if (annotations[componentName][type]) {
          return annotations[componentName][type];
        }
        annotations[componentName][type] = componentDefinition;
        return annotations[componentName][type];
      },
      get: function(componentName, type) {
        annotations[componentName] = annotations[componentName] || {};
        if (!type) {
          return angular.bind(this, this.get, componentName);
        }
        return annotations[componentName][type];
      }
    }; // end return
  }

  angular.module = function() {

    // Call the module as normaly and grab the instance
    var moduleInstance = angularModule.apply(angular, arguments);

    moduleInstance.provider('$at', function() {
      this.$get = ['$injector', $Annotation];
    });

    function component(componentName, componentDefinition) {
      moduleInstance.directive(componentName, ['$injector', '$parse', function($injector, $parse) {
        var $at = $injector.get('$at');
        var $atGet = $at.get(componentName);

        var controller = componentDefinition({
          Component: $at.asClass(componentName, 'Component'),
          Template:  $at.asClass(componentName, 'Template')
        });

        function callLifecycleMaybe(event, context, args) {
          if ($atGet('Component').lifecycle && $atGet('Component').lifecycle[event]) {
            if (controller[$atGet('Component').lifecycle[event]]) {
              controller[$atGet('Component').lifecycle[event]].apply(context, args);
            } else {
              controller.prototype[$atGet('Component').lifecycle[event]].apply(context, args);
            }
          }
        }
        var ddo = {
          restrict: 'EAC',
          template: $atGet('Template').inline,
          // controller: componentName+'Controller',
          // controller: controller,
          // controllerAs: 'ctrl',
          // bindToController: true,
          scope: $atGet('Component').bind,
          replace: !!$atGet('Component').replace,
          require: ['?ngModel', '?form'],
          compile: function() {
            callLifecycleMaybe('start', this, arguments);

            return {
              pre: function() {
                callLifecycleMaybe('before', this, arguments);

              },
              post: function(scope, element, attrs, ctrls, transclude) {
                var ctrl = $injector.get('$controller')(controller, {
                  $scope: scope,
                  $element: element,
                  $transclude: transclude
                  // $parent:
                });
                var self = this;
                angular.forEach($atGet('Component').event, function(method, event) {
                  element.on(event, function(event) {
                    var getter = $parse(angular.bind(scope, ctrl[method]));
                    getter(ctrl, {$event: event});
                    scope.$digest();
                    // var getter = $parse(method);
                    // getter(scope.ctrl, $event);
                  });
                  scope.$on('$destory', function() {
                    element.off(event);
                  });
                });

                callLifecycleMaybe('ready', self, arguments);
                scope.$on('$destory', function() {
                  callLifecycleMaybe('destory', self, arguments);
                });
              // link: function(scope, element, attrs, ctrls) {

              }
            };
          }
        };

        if ($atGet('Template').url) {
          ddo.templateUrl = $atGet('Template').url;
        }

        return ddo;
      }]);


      return this;
    }


    moduleInstance.component = component;


    return moduleInstance;
  };
}(angular));

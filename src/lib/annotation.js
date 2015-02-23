(function() {
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

  angular.module('ngAnnotation', []).provider('$at', function() {
    this.$get = ['$injector', $Annotation];
  });

  if (typeof module === 'object' && typeof define !== 'function') {
    module.exports = angular.module('Annotation');
  }
}());

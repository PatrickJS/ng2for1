import angular from 'exports?window.angular!angular';

angular.module('component', [])
.component('helloWorld', function({ Component, Template }) {

  Component({
    selector: 'helloWorld',
    bind: {
      'yoAttr': '='
    },
    event: {
      'click': 'clicking'
    },
    lifecycle: {
      start: 'start',
      before: 'before',
      ready: 'ready',
      destory: 'destory'
    }
  });

  Template({
    inline: `
      <div>
       Test tet {{ yolo }} {{ yoAttr }} {{ kool }}
      </div>
    `
  });
  class World {
    constructor($scope) {
      console.log('swag', $scope);
      this.yolo = 'yolo';
      $scope.kool = 'kool';
    }
    yolo() {

    }

    clicking($event) {
      console.log('yolo', this.yolo, $event);
      if (this.yolo === 'lol') {
        this.yolo = 'yolo';
      } else {
        this.yolo = 'lol';
      }
    }

    start() {
      console.log('Start', arguments);
    }
    before() {
      console.log('Before', arguments);
    }
    ready() {
      console.log('Ready', arguments);
    }
    destory() {
      console.log('Destory', arguments);
    }
  }


  return World;
});

// export default angular.module('component', []).component('helloWorld', HelloWorld);
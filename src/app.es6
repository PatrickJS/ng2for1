import angular from 'exports?window.angular!angular';
import hacks from 'hacks';
import component from './component.es6';

export default angular.module('App', [
  component.name
])
.run(function($rootScope, $injector) {
  console.log('Loaded');
  window.$injector = $injector;
  window.$rootScope = $rootScope;
})
.controller('MainCtrl', function() {

  this.toggle = false;

  this.toggleState = function() {
    this.toggle = !this.toggle;
  };

  this.testingClick = function($event) {
    console.log('yolo', $event);
  };

});


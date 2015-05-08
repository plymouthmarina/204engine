'use strict';

angular
  .module('animationEngineApp', [
    'ngRoute',
    'engineDir',
    'engine'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

var engine = angular.module('engine', []);

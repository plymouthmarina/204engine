'use strict';

/**
 * @ngdoc overview
 * @name animationEngineApp
 * @description
 * # animationEngineApp
 *
 * Main module of the application.
 */
angular
  .module('animationEngineApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
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
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

var engine = angular.module('engine', []);

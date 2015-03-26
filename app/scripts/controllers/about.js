'use strict';

/**
 * @ngdoc function
 * @name animationEngineApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the animationEngineApp
 */
angular.module('animationEngineApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

angular.module('engineDir', []).directive('enginedir', [ function () {
  'use strict';
  return {
    restrict: 'E',
    replace: true,
    template: '<canvas id="canvas" width="1240" height="720">Your browser doesn\'t seem to support HTML5 :(</canvas>'
  };
}]);
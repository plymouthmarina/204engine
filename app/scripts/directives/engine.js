angular.module("engineDir", []).directive('enginedir', ['assetsSvc', 'fx', 'canvasSvc', function (assetsSvc, fx) {
  "use strict";
  return {
    restrict: 'E',
    replace: true,
    template: '<canvas id="canvas" width="1000" height="1000">Your browser doesn\'t seem to support HTML5 :(</canvas>',
    link: function (scope, element, attribute) {
      'use strict';

      
      // canvas.init(1000, 1000);
    }
  }
}])
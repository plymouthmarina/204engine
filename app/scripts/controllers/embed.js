'use strict';

angular.module('animationEngineApp')
  .controller('MainCtrl', ['canvasSvc', function (canvasSvc) {

    var self = this;

    self.play = function () {
        canvasSvc.init(1280, 720);
    };

    canvasSvc.init(1280, 720);

    self.stop = function () {
        canvasSvc.stop();
    };
}]);
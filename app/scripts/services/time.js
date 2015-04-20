engine.service('time', function () {
  'use strict';

  var self = this;

  self.startTime = null;
  self.deltaTime = null;
  self.currentTime = null;

  self.reset = function () {
    self.startTime = null;
    self.deltaTime = null;
    self.currentTime = null;
  };

});
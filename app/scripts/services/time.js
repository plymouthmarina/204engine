engine.service('time', function () {
  'use strict';

  var self = this;

  self.startTime = null;
  self.deltaTime = null;
  self.currentTime = null;

  self.reset = function () {
    console.log('time reset!');
    self.startTime = null;
    self.deltaTime = null;
    self.currentTime = null;
  };
});
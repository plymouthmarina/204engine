engine.service('canvasSvc', ['assetsSvc', 'fx', 'time', function (assetsSvc, fx, time) {
  'use strict';
  var self = this;

  // we're changing position, so need to get a copy, not reference!
  var assets = null;
  var canvas = null;
  var context = null;

  var width, height = 1000;

  // global vars
  // need key-values so we can link images to asset props ^
  var images = {};

  var frameRequestId;

  self.stop = function () {
    cancelAnimationFrame(frameRequestId);
    frameRequestId = null;
  };

  self.init = function (width, height) {
    console.log('play');

    // fi frameRequestId is set, stop request and reset value
    if (frameRequestId) {
      self.stop();
    }

    time.reset();

    // DEEP COPY!
    assets = angular.copy(assetsSvc.assets);
    console.log('assets', assets);

    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    width = width;
    height = height;
    // preload images
    assets.forEach(function (asset, index) {
        if (asset.type === 'image') {
            // to implement:
            // insert img tag in dom with angular when added, then load image from that source
            images[asset.name] = new Image();
            images[asset.name].src = asset.src;
        }
    });

    frameRequestId = requestAnimationFrame(self.drawFrame);
  };

  self.drawFrame = function (timestamp) {
    console.log('drawing new frame');

      // set start time when animation starts
      if (!time.startTime || time.startTime === null) { 
        time.startTime = timestamp;
        time.currentTime = timestamp;
        time.deltaTime = 0;
        console.log('resetting time!');
      } else {
        time.deltaTime = timestamp - time.currentTime;
        console.log(time.deltaTime, timestamp - time.currentTime);
        time.currentTime = timestamp;
      }

      console.log('current time', time.currentTime);
      console.log('timestamp', timestamp);
      console.log('delta', time.deltaTime);
      console.log('time elapsed', time.currentTime - time.startTime);

      // console.log('timestamp', timestamp);
      // console.log('current', time.currentTime);
      // // console.log('start', time.start);
      // console.log('delta', time.deltaTime);

      // calculate time elapsed
      var timeElapsed = timestamp - time.startTime;

      // UPDATE
      // console.log("current assets passed :", assets);
      assets.forEach(function (asset, index) {
          if (asset.effects) {
            asset.effects.forEach(function (effect, index) {
                // check if effects function needs to be called
                if (effect.startTime <= timeElapsed && (effect.startTime + effect.duration) > timeElapsed) {
                    // fx.translate(asset, effect, timeElapsed);
                    fx[effect.type](asset, effect, timeElapsed);
                }
            });
          }
      });

      // DRAW
      // clear canvas
      context.clearRect(0, 0, width, height);

      assets.forEach(function (asset, index) {

          if (asset.type === 'rect') {
              context.rect(asset.x, asset.y, (asset.width/100) * asset.scale, (asset.height/100) * asset.scale);
              context.fillStyle=asset.fill;
              context.fill();
          }
          else if (asset.type === 'image') {
              context.drawImage(images[asset.name], asset.x, asset.y, images[asset.name].width * (asset.scale / 100), images[asset.name].height * (asset.scale / 100));
          }
      });

      frameRequestId = requestAnimationFrame(self.drawFrame);
  };
}]);
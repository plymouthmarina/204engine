 angular.module('engine', []).service('assetsSvc', function () {
  'use strict';
  var self = this;

  self.assets = [
        {
            name: 'background',
            type: 'rect',
            fill: '#666',
            x: 0,
            y: 0,
            scale: 100,
            width: 1000,
            height: 1000,
            effects: []
        }, {
            name: 'smiley',
            type: 'image',
            src: 'images/smiley.jpg',
            x: 200,
            y: 200,
            scale: 100,
            width: 100,
            height: 100,
            effects: [ 
                {   
                    type: 'translate',
                    from: {
                        x: null,
                        y: null
                    },
                    to: {
                        x: 800,
                        y: 800
                    },
                    startTime: 1000,
                    duration: 2000
                }
            ]
        }
    ];

  self.getAssets = function () {
    return angular.copy(self.assets);
  };

})

.service('time', function () {
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

})


.service('fx', ['time', function (time) {
  'use strict';

  this.translate = function (asset, effect, timestamp) {
      // save start values x & y to calculate increments
      if (typeof effect.from.x !== 'number' || effect.from.x === null) {
          console.log('set effect starting point');
          effect.from.x = asset.x;
          effect.from.y = asset.y;
      }

      // calculate delta per milisecond
      var incX = (effect.to.x - effect.from.x) / effect.duration;
      var incY = (effect.to.y - effect.from.y) / effect.duration;

      // should do: new pos = current pos + (timeElapsedSinceLastDraw *incX)
      // does: new pos = current pos + (timeElapsedSinceStart *incX)
      asset.x = asset.x + (incX * time.deltaTime);
      asset.y = asset.y + (incY * time.deltaTime);

      // note to self: we're passing by reference here dummy, so just change obj properties :)
  };

  this.scale = function (asset, effect, timestamp) {

    if (typeof effect.from.scale !== 'number' || effect.from.scale === null) {
      effect.from.scale = asset.scale;
    }

    var inc = (effect.to.scale - effect.from.scale) / effect.duration;
    asset.scale = asset.scale + (inc * time.deltaTime);

  };
}])

.service('canvasSvc', ['assetsSvc', 'fx', 'time', function (assetsSvc, fx, time) {
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

  self.init = function (width, height) {
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

      requestAnimationFrame(self.drawFrame);
  };

  self.drawFrame = function (timestamp) {

      // set start time when animation starts
      if (!time.start) { 
        time.start = timestamp;
        time.currentTime = timestamp;
        time.deltaTime = 0;
      } else {
        time.deltaTime = timestamp - time.currentTime;
        time.currentTime = timestamp;
      }

      // calculate time elapsed
      var timeElapsed = timestamp - time.start;

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
              context.rect(asset.x, asset.y, asset.width, asset.height);
              context.fillStyle=asset.fill;
              context.fill();
          }
          else if (asset.type === 'image') {
              context.drawImage(images[asset.name], asset.x, asset.y, asset.width, asset.height);
          }
      });

      requestAnimationFrame(self.drawFrame);
  };
}]);
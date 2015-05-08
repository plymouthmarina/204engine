engine.service('canvasSvc', ['assetsSvc', 'fx', 'time', function (assetsSvc, fx, time) {
  'use strict';
  var self = this;

  // we're changing position, so need to get a copy, not reference!
  var assets = null;
  var canvas = null;
  var context = null;

  var width = 1240;
  var height = 720;

  // global vars
  // need key-values so we can link images to asset props ^
  var images = {};

  var frameRequestId;

  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');

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
    // console.log('assets', assets);


    console.log(context);

    width = width;
    height = height;

    console.log("width: " + width + " height: " + height);
    // preload images
    assets.forEach(function (asset) {
      if (asset.type === 'image' || asset.type === 'spritesheet') {
        // to implement:
        // insert img tag in dom with angular when added, then load image from that source
        images[asset.name] = new Image();
        images[asset.name].src = asset.src;
      } else if (asset.type === 'audio') {
        // register the sound file with soundjs
        console.log('loading audio');
        asset.audio = new Audio(asset.src);
        // asset.audio.load();
      }
    });

    context.fillStyle = "#FFF";
    context.fill();
    context.clearRect(0, 0, width, height);

    frameRequestId = requestAnimationFrame(self.drawFrame);
  };

  self.drawFrame = function (timestamp) {
    // console.log('drawing new frame');

      // set start time when animation starts
      if (!time.startTime || time.startTime === null) {
        time.startTime = timestamp;
        time.currentTime = timestamp;
        time.deltaTime = 0;
        // console.log('resetting time!');
      } else {
        time.deltaTime = timestamp - time.currentTime;
        // console.log(time.deltaTime, timestamp - time.currentTime);
        time.currentTime = timestamp;
      }

      // calculate time elapsed
      var timeElapsed = timestamp - time.startTime;

      // clear canvas
      context.clearRect(0, 0, width, height);

      // UPDATE
      // console.log("current assets passed :", assets);
      assets.forEach(function (asset) {
        if (asset.effects) {
          asset.effects.forEach(function (effect) {
            // check if effects function needs to be called
            if (effect.startTime <= timeElapsed && (effect.startTime + effect.duration) > timeElapsed) {
              // fx.translate(asset, effect, timeElapsed);
              fx[effect.type](asset, effect, timeElapsed);
            }
          });
        }
      });

      // DRAW
      assets.forEach(function (asset) {
        // calculate scaled width and height of asset as we need to know for rotation
        var scaledWidth = asset.width * (asset.scale / 100);
        var scaledHeight = asset.height * (asset.scale / 100);

        // save the unrotated context of the canvas so we can restore it later
        // the alternative is to untranslate & unrotate after drawing
        context.save();

        if (asset.opacity !== null){
          context.globalAlpha = asset.opacity;
        }

        if (asset.rotation !== 0){

          // calculate centre point of asset
          var cx = asset.x + scaledWidth * 0.5;
          var cy = asset.y + scaledHeight * 0.5;

          // move to centre of asset
          context.translate(cx, cy);

          // rotate the canvas to the specified degrees
          context.rotate(asset.rotation*Math.PI/180);

          // move back to 0x0
          context.translate(-cx, -cy);
        }

        switch (asset.type) {
          case 'rect':
            console.log(asset.x);
            context.beginPath();
            context.fillStyle = asset.fill;
            context.rect(asset.x, asset.y, scaledWidth, scaledHeight);
            context.fill();
            context.closePath();
            break;

          case 'image':
            context.drawImage(images[asset.name], asset.x, asset.y, scaledWidth, scaledHeight);
            break;

          case 'spritesheet':
            self.drawSpriteSheet(asset, images[asset.name], timeElapsed);
            break;

          case 'audio':
            if (timeElapsed > asset.start && !asset.playing ) {
              self.playAudio(asset);
            }
        }

        // we’re done with the rotating so restore the unrotated context
        context.restore();

      });

      frameRequestId = requestAnimationFrame(self.drawFrame);
  };

  self.drawSpriteSheet = function (asset, image, timeElapsed) {
    var frame = Math.floor(timeElapsed * asset.framesPerSecond / 1000);
    if(frame >= asset.frames) {
        frame = frame % asset.frames;
    }

    var x = frame * asset.width;
    var width = asset.width * (asset.scale / 100);
    var height = asset.height * (asset.scale / 100);

    context.drawImage(image, x, 0, width, height, asset.x, asset.y, width, height);
  };

  self.playAudio = function (asset) {
      // mark as playing to prevent further calls
      console.log('play audio');
      asset.playing = true;
      asset.audio.play();
  };

}]);
angular.module("engineDir", []).directive('enginedir', ['assetsSvc', function (assetsSvc) {
  "use strict";
  return {
    restrict: 'E',
    replace: true,
    template: '<canvas id="canvas" width="1000" height="1000">Your browser doesn\'t seem to support HTML5 :(</canvas>',
    link: function (scope, element, attribute) {
      'use strict';

      var assets = assetsSvc.getAssets();
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');

      var width, height = 1000;

      // global vars
      var start = 0;

      // need key-values so we can link images to asset props ^
      var images = {};

      function init (_assets, width, height) {
        console.log("INITIATIONNNNN");
          var assets = assetsSvc.assets;
          console.log(assets);

          canvas = document.getElementById('canvas');
          context = canvas.getContext('2d');

          width = width;
          height = height;
          // load images
          console.log("_assets", _assets);
          console.log("assets", assets);
          assets.forEach(function (asset, index) {
              console.log("asset " + index);
              if (asset.type == 'image') {
                  // to implement:
                  // insert img tag in dom with angular when added, then load image from that source
                  images[asset.name] = new Image();
                  images[asset.name].src = asset.src;
              }
          });

          requestAnimationFrame(drawFrame);
      }

      function drawFrame (timestamp) {
          // set start time when animation starts
          if (!start) start = timestamp;
          // calculate time elapsed
          var deltaTime = timestamp - start;

          // var assets = assetsSvc.getAssets();
          // UPDATE
          console.log("current assets passed :", assets);
          assets.forEach(function (asset, index) {
              if (asset.effects) asset.effects.forEach(function (effect, index) {
                  // check if effects function needs to be called
                  if (effect.startTime <= timestamp && (effect.startTime + effect.duration) > timestamp) {
                      console.log('lets move this thing!');
                      fx.translate(asset, effect, timestamp);
                  }
              });
          });

          // DRAW
          // clear canvas
          context.clearRect(0, 0, width, height);

          assets.forEach(function (asset, index) {
              console.log("length", assets);
              console.log('please draw me', index);

              if (asset.type == 'rect') {
                  context.rect(asset.x, asset.y, asset.width, asset.height);
                  context.fillStyle=asset.fill;
                  context.fill();
              }
              else if (asset.type == 'image') {
                  context.drawImage(images[asset.name], asset.x, asset.y, asset.width, asset.height);
              }
          });

          // run animation
          requestAnimationFrame(drawFrame);
      }
      init(1000, 1000);
    }
  }
}])
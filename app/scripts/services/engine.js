angular.module("engine", []).service("assetsSvc", function () {
  var self = this

  self.assets = [
        {
            name: 'background',
            type: 'rect',
            fill: '#666',
            x: 0,
            y: 0,
            width: 1000,
            height: 1000,
            effects: []
        }, {
            name: 'smiley',
            type: 'image',
            src: 'images/smiley.jpg',
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            effects: [ 
                {   
                    type: 'translate',
                    from: {
                        x: 0,
                        y: 0
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
    return self.assets;
  }
})


.service("fx", function () {
  var self = this;

    this.translate = function (asset, effect, timestamp) {
        // save start values x & y to calculate increments
        if (typeof effect.from.x !== 'number') {
            console.log('set effect starting point');
            effect.from.x = asset.x;
            effect.from.y = asset.y;
        }

        var incX = (effect.to.x - effect.from.x) / effect.duration;
        var incY = (effect.to.y - effect.from.y) / effect.duration;

        asset.x = incX * (timestamp - effect.startTime);
        // console.log(incX * (timestamp - effect.startTime));
        asset.y = incY * (timestamp - effect.startTime);

        // note to self: we're passing by reference here dummy, so just change obj properties :)
        // return { x: incX * (timestamp - startTime), y: incY * (timestamp - startTime) };
    }
})

.service("canvasSvc", ['assetsSvc', 'fx', function (assetsSvc, fx) {
  var self = this;

  // we're changing position, so need to get a copy, not reference!
  var assets = assetsSvc.assets;
  var canvas = null;
  var context = null;

  var width, height = 1000;

  // global vars
  self.start = 0;

  // need key-values so we can link images to asset props ^
  var images = {};

  self.init = function (_assets, width, height) {
    start = 0;
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

      requestAnimationFrame(self.drawFrame);
  }

  self.drawFrame = function (timestamp) {
      // set start time when animation starts
      if (!start) start = timestamp;
      // calculate time elapsed
      var deltaTime = timestamp - start;

      // var assets = assetsSvc.getAssets();
      // UPDATE
      // console.log("current assets passed :", assets);
      assets.forEach(function (asset, index) {
          if (asset.effects) asset.effects.forEach(function (effect, index) {
              // check if effects function needs to be called
              if (effect.startTime <= timestamp && (effect.startTime + effect.duration) > timestamp) {
                  // console.log('lets move this thing!');
                  fx.translate(asset, effect, timestamp);
              }
          });
      });

      // DRAW
      // clear canvas
      context.clearRect(0, 0, width, height);

      assets.forEach(function (asset, index) {
          // console.log("length", assets);
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
      requestAnimationFrame(self.drawFrame);
  }
}])
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
        console.log(incX * (timestamp - effect.startTime));
        asset.y = incY * (timestamp - effect.startTime);

        // note to self: we're passing by reference here dummy, so just change obj properties :)
        // return { x: incX * (timestamp - startTime), y: incY * (timestamp - startTime) };
    }
})
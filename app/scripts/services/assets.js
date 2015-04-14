angular.module("assets", []).service("assetsSvc", function () {
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
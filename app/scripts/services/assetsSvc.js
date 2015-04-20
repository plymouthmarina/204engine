engine.service('assetsSvc', function () {
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

});
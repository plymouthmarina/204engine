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
            rotation: 0,
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
            rotation: 0,
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
                },
                {
                    type: 'rotate',
                    from: {
                        rotation: null,
                    },
                    to: {
                        rotation: 180,
                    },
                    startTime: 2000,
                    duration: 2000
                                    
                }
            ]
        }, {
            name: 'explosion',
            type: 'spritesheet',
            src: 'images/fire_explosion.png',
            frames: 9,
            framesPerSecond: 9,
            x: 0,
            y: 0,
            scale: 100,
            rotation: 0,
            width: 128,
            height: 128,
            effects: [ 
                {   
                    type: 'translate',
                    from: {
                        x: null,
                        y: null
                    },
                    to: {
                        x: 500,
                        y: 500
                    },
                    startTime: 0,
                    duration: 2000
                },
                {
                    type: 'rotate',
                    from: {
                        rotation: null,
                    },
                    to: {
                        rotation: 180,
                    },
                    startTime: 2000,
                    duration: 2000
                                    
                }
            ]
        }
    ];

  self.getAssets = function () {
    return angular.copy(self.assets);
  };

});
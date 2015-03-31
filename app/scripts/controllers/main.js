'use strict';

/**
 * @ngdoc function
 * @name animationEngineApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the animationEngineApp
 */
angular.module('animationEngineApp')
  .controller('MainCtrl', function () {

    var self = this;

    self.assets = [
        {
            name: 'background',
            type: 'rect',
            fill: '#666',
            x: 0,
            y: 0,
            width: canvas.width,
            height: canvas.height
        }, {
            name: 'smiley',
            type: 'image',
            src: 'img/smiley.jpg',
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

    self.addTranslate = function (asset, start, dur, destX, destY) {
        var params = {
            type: 'translate',
            from: {
                x: 800,
                y: 800
            },
            to: {
                x: destX,
                y: destY
            },
            startTime: start,
            duration: dur,
        };

        asset.effects.push(params);

        console.log(self.assets);
    };

  });


/* effects object:
{
    type: move,
    parameters: {
        
    }
}
*/
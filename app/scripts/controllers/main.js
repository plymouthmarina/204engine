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

    this.object = {
        position: {
            x: 100,
            y: 100
        },
        effects: []

    };

    this.data = JSON.stringify(this.object);

    this.addMove = function (obj, destX, destY) {
        var params = {
            type: 'move',
            startTime: 1,
            parameters: {
                destX: destX,
                destY: destY
            }
        };

        obj.effects.push(params);

        console.log(obj);
    };

  });


/* effects object:
{
    type: move,
    parameters: {
        
    }
}
*/
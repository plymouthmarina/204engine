'use strict';

angular.module('animationEngineApp')
  .controller('MainCtrl', ['assetsSvc', 'canvasSvc', function (assetsSvc, canvasSvc) {

    var self = this;
    // var c = {
    //     width: 1000,
    //     height: 1000
    // };

    self.fxIndex = null;
    self.assetSelected = null;

    self.play = function () {
        canvasSvc.init(1000, 1000);
    };

    // this should be a shallow copy to keep the service in sync with the view
    self.assets = assetsSvc.assets;

    self.addTranslate = function (index, start, dur, destX, destY) {
        if (!index) {
            console.log('Current asset: ' + index);
            return console.error('No asset index selected');
        }

        var asset = self.assets[index];

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

    self.deleteEffect = function (assetIndex, fxIndex) {
        self.assets[assetIndex].effects.splice(fxIndex, 1);
    };

    self.addAsset = function () {
        self.assets.push(self.assetSelected);
    };

    self.deleteAsset = function (assetIndex) {
        self.assets.splice(assetIndex, 1);
    };

    self.templates = {
        rect: {
            name: 'rectangle',
            type: 'rect',
            fill: '#777',
            x: 0,
            y: 0,
            width: canvas.width,
            height: canvas.height,
            effects: []
        },
        image: {
            name: 'image',
            type: 'image',
            src: null,
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            effects: []
        }
    };
}]);

/* effects object:
{
    type: move,
    parameters: {
        
    }
}
*/
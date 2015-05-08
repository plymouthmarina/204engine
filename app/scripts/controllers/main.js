'use strict';

angular.module('animationEngineApp')
  .controller('MainCtrl', ['assetsSvc', 'canvasSvc', function (assetsSvc, canvasSvc) {

    var self = this;
    // var c = {
    //     width: 1000,
    //     height: 1000
    // };

    // first is asset selected, second is effect to be applied
    self.fxIndex = null;
    self.fxSelected = null;

    self.assetSelected = null;

    self.play = function () {
        canvasSvc.init(1280, 720);
    };

    self.stop = function () {
        canvasSvc.stop();
    };

    if (localStorage.getItem('assets')) {
        console.log('stuff found in localstorage');
        var lcl = JSON.parse(localStorage.getItem('assets'));
        assetsSvc.assets = angular.copy(lcl);
        console.log(lcl);
        // this should be a shallow copy to keep the service in sync with the view
        self.assets = assetsSvc.assets;
    } else {
        console.log('nothing found, just getting default');
        self.assets = assetsSvc.assets;
    }

    self.save = function () {
        console.log('save stuff local');
        localStorage.setItem('assets', JSON.stringify(assetsSvc.assets));
    };

    self.addEffect = function (index, effect) {
        if (!index) {
            console.log('Current asset: ' + index);
            return console.error('No asset index selected');
        }

        console.log('effect: ', effect.type);

        var asset = assetsSvc.assets[index];
        var params = angular.copy(self.fxTemplates[effect.type]);

        asset.effects.push(params);
    };


    self.addTranslate = function (index, start, dur, destX, destY) {
        if (!index) {
            console.log('Current asset: ' + index);
            return console.error('No asset index selected');
        }

        var asset = assetsSvc.assets[index];

        var params = {
            type: 'translate',
            from: {
                x: null,
                y: null
            },
            to: {
                x: destX,
                y: destY
            },
            startTime: start,
            duration: dur,
        };

        asset.effects.push(params);

        console.log(assetsSvc.assets);
    };

    self.addScale = function (index, start, dur, destScale) {
        if (!index) {
            console.log('current asset: ' + index);
            return console.error('No asset selected!');
        }

        var asset = assetsSvc.assets[index];
        var params = {
            type: 'scale',
            from: {
                scale: null
            },
            to: {
                scale: destScale
            },
            startTime: start,
            duration: dur
        };

        asset.effects.push(params);
        console.log(assetsSvc.assets);
    };

    self.deleteEffect = function (assetIndex, fxIndex) {
        assetsSvc.assets[assetIndex].effects.splice(fxIndex, 1);
    };

    self.addAsset = function () {
        assetsSvc.assets.push(self.assetSelected);
    };

    self.deleteAsset = function (assetIndex) {
        assetsSvc.assets.splice(assetIndex, 1);
    };

    self.fxTemplates = {
        scale: {
            type: 'scale',
            from: {
                scale: null
            },
            to: {
                scale: null
            },
            startTime: null,
            duration: null
        },
        translate: {
            type: 'translate',
            from: {
                x: null,
                y: null
            },
            to: {
                x: null,
                y: null
            },
            startTime: null,
            duration: null,
        },
        rotate: {
            type: 'rotate',
            from: {
                rotation: null,
            },
            to: {
                rotation: null,
            },
            startTime: null,
            duration: null,
        },
        fade: {
            type: 'fade',
            from:{
                opacity: null
            },
            to:{
                opacity: null
            },
            startTime: null,
            duration: null,
        }
    };

    self.templates = {
        rect: {
            name: 'rectangle',
            type: 'rect',
            fill: '#777',
            x: 0,
            y: 0,
            scale: 100,
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
            scale: 100,
            width: 100,
            height: 100,
            effects: []
        },
        spritesheet: {
            name: 'spritesheet',
            type: 'spritesheet',
            src: null,
            x: 0,
            y: 0,
            scale: 100,
            width: 100,
            height: 100,
            frames: 9,
            framesPerSecond:1,
            effects: []
        },
        audio: {
            name: 'music',
            type: 'audio',
            src: null,
            start: 0,
            playing: false
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
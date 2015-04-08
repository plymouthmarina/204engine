'use strict';

var assets = null;
var canvas = null;
var context = null;

var width, height = null;

// global vars
var start = null;

// need key-values so we can link images to asset props ^
var images = {};

function init(assets, width, height) {
    var assets = assets;

    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    width = width;
    height = height;
    // load images
    assets.forEach(function (assets, index) {
        if (asset.type == 'image') {
            // to implement:
            // insert img tag in dom with angular when added, then load image from that source
            images[asset.name] = new Image();
            images[asset.name].src = asset.src;
        }
    });

    requestAnimationFrame(drawFrame);
}

function drawFrame(timestamp, assets) {
    // set start time when animation starts
    if (!start) start = timestamp;
    // calculate time elapsed
    var deltaTime = timestamp - start;

    // UPDATE
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
        console.log('please draw me');

        if (asset.type == 'rect') {
            context.rect(asset.x, asset.y, asset.width, asset.height);
            context.fillStyle=asset.fill;
            context.fill();
        }
        else if (asset.type == 'image') {
            context.drawImage(images[asset.name], asset.x, asset.y, asset.width, asset.height);
        }
    });

    // request next frame
    requestAnimationFrame(drawFrame);
}

/******************************
***** ANIMATION FUNCTIONS
*******************************/
var fx = {
    translate: function (asset, effect, timestamp) {
        // save start values x & y to calculate increments
        if (typeof effect.params.origX !== 'number') {
            console.log('set effect starting point');
            effect.params.origX = asset.x;
            effect.params.origY = asset.y;
        }

        var incX = (effect.params.destX - effect.params.origX) / effect.duration;
        var incY = (effect.params.destY - effect.params.origY) / effect.duration;

        asset.x = incX * (timestamp - effect.startTime);
        console.log(incX * (timestamp - effect.startTime));
        asset.y = incY * (timestamp - effect.startTime);

        // note to self: we're passing by reference here dummy, so just change obj properties :)
        // return { x: incX * (timestamp - startTime), y: incY * (timestamp - startTime) };
    }
};

// requestAnimationFrame(init(assets));
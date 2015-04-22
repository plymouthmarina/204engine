engine.service('fx', ['time', function (time) {
  'use strict';

  this.translate = function (asset, effect, timestamp) {
      // save start values x & y to calculate increments
      if (typeof effect.from.x !== 'number' || effect.from.x === null) {
          console.log('set effect starting point');
          effect.from.x = asset.x;
          effect.from.y = asset.y;
      }

      // calculate delta per milisecond
      var incX = (effect.to.x - effect.from.x) / effect.duration;
      var incY = (effect.to.y - effect.from.y) / effect.duration;

      // should do: new pos = current pos + (timeElapsedSinceLastDraw *incX)
      // does: new pos = current pos + (timeElapsedSinceStart *incX)
      asset.x = asset.x + (incX * time.deltaTime);
      asset.y = asset.y + (incY * time.deltaTime);

      // note to self: we're passing by reference here dummy, so just change obj properties :)
  };

  this.scale = function (asset, effect, timestamp) {

    if (typeof effect.from.scale !== 'number' || effect.from.scale === null) {
      effect.from.scale = asset.scale;
    }

    var inc = (effect.to.scale - effect.from.scale) / effect.duration;
    asset.scale = asset.scale + (inc * time.deltaTime);

  };
  
  this.rotate = function (asset, effect, timestamp){
      
    if (typeof effect.from.rotation !== 'number' || effect.from.rotation === null) {
      effect.from.rotation = asset.rotation;
    }
      
    var degrees = (effect.to.rotation - effect.from.rotation) / effect.duration;
    asset.rotation = asset.rotation + (degrees * time.deltaTime); 
      
  }
}]);
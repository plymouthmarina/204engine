'use strict';

angular.module('animationEngineApp')
  .controller('MainCtrl', ['engine', function (engine) {
  
      var self = this;
      var c = {
          width: 1000,
          height: 1000
      }
  
      self.fxIndex = null;
      self.assetSelected = null;
  
      self.play = function () {
          console.log(self.assets);
          engine.init(self.assets, c.width, c.height);
      };
  
      self.assets = [
          {
              name: 'background',
              type: 'rect',
              fill: '#666',
              x: 0,
              y: 0,
              width: c.width,
              height: c.height,
              effects: []
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
  
      self.addTranslate = function (index, start, dur, destX, destY) {
          if (!index) {
              console.log("Current asset: " + index);
              return console.error("No asset index selected");
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
              width: c.width,
              height: c.height,
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
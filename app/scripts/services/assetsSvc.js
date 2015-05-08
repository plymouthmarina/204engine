engine.service('assetsSvc', function () {
  'use strict';
  var self = this;

  self.assets = [{"name":"background","type":"image","src":"images/burrow.png","x":0,"y":0,"scale":100,"width":1240,"height":720,"effects":[]},{"name":"image","type":"image","src":"images/yeoman.png","x":0,"y":0,"scale":100,"width":100,"height":100,"effects":[]}];

  self.getAssets = function () {
    return angular.copy(self.assets);
  };

});
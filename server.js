'use strict';

var express         = require('express'),
   path             = require('path'),
   bodyParser       = require('body-parser'),
   fs               = require('fs'),
   async            = require('async'),
   app              = express();

var port = process.env.PORT || 8080;

app.use(express.static('app'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/export', function (req, res) {
  var data = req.body.data;
  console.log("got a post request on /export!");

  
  var html;
  async.series([
    function (callback) {
      fs.readFile('./app/scripts/directives/engine.js', { encoding: 'utf8', flag: 'r' }, function (err, data) {
        if (err) callback(err);
        callback(null, data);
      });
    }, function (callback) {
      fs.readFile('./app/scripts/services/canvasSvc.js', { encoding: 'utf8', flag: 'r' }, function (err, data) {
        if (err) callback(err);
        callback(null, data);
      });
    }, function (callback) {
      fs.readFile('./app/scripts/services/fx.js', { encoding: 'utf8', flag: 'r' }, function (err, data) {
        if (err) callback(err);
        callback(null, data);
      });
    }, function (callback) {
      fs.readFile('./app/scripts/services/time.js', { encoding: 'utf8', flag: 'r' }, function (err, data) {
        if (err) callback(err);
        callback(null, data);
      });
    }, function (callback) {
      fs.readFile('./app/scripts/controllers/embed.js', { encoding: 'utf8', flag: 'r' }, function (err, data) {
        if (err) callback(err);
        callback(null, data);
      });
    }],
    // final callback
    function (err, files) {
      if (err) throw err;

      var assets= 'engine.service("assetsSvc", function () { "use strict";  var self = this; self.assets = ';
      var assets2 = '; self.getAssets = function () { return angular.copy(self.assets); }; });';
      var appjs = "'use strict'; angular.module('animationEngineApp', ['ngRoute','engineDir','engine']).config(function ($routeProvider) { $routeProvider.when('/', { template: '<enginedir>Your browser doesnt seem to support HTML5</enginedir>', controller: 'MainCtrl', controllerAs: 'main' }).otherwise({ redirectTo: '/'});}); var engine = angular.module('engine', []);";

      html = '<div ng-app="animationEngineApp"><script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.15/angular.js"></script><script src="bower_components/angular-route/angular-route.js"></script><div ng-view=""></div><script type="text/javascript">';
      html += appjs;
      var assetsSvc = assets + data + assets2;
      html += assetsSvc;

      for (var i = 0; i < files.length; i++) {
        html += files[i];
      }
      // add all js to html
      html += '</script></div>';

      console.log(html);
      res.send(html);
    }
  );
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + req.path));
});

app.listen(port, function () {
  console.log('Server is listening at ' + port);
});
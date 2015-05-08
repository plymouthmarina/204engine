'use strict';

var express = require('express');
var path = require('path');
var app = express();

var port = process.env.PORT || 8080;

app.use(express.static('app'));

app.get('/export', function (req, res) {
  // concat all files together needed for embedding
  
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + req.path));
});

app.listen(port, function () {
  console.log('Server is listening at ' + port);
});
var express = require('express');
var path = require('path');

var app = express();

app.get('/', function(req,res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/grid.js', function(req,res) {
  res.sendFile(__dirname + '/public/grid.js');
});

app.get('/binarytree', function(req,res) {
  res.sendFile(__dirname + '/binarytree.html');
});

app.get('/sidewinder', function(req,res) {
  res.sendFile(__dirname + '/sidewinder.html');
});

app.use(express.static(path.join(__dirname, 'public')));
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

module.exports = app;

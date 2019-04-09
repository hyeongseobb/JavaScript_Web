var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);

app.get('/seob11', function (req, res) {
  res.sendfile("final.html");
});

app.get('/seob12', function (req, res) {
  res.sendfile("array.html");
});

app.get('/seob13', function (req, res) {
  res.sendfile("array2.html");
});

console.log("running");

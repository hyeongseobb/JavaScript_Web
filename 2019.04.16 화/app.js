var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);

app.get('/seob13', function (req, res) {
  res.sendfile("array2.html");
});

app.get('/seob14', function (req, res) {
  res.sendfile("array3.html");
});

app.get('/seob15', function (req, res) {
  res.sendfile("object.html");
});

app.get('/seob16', function (req, res) {
  res.sendfile("object2.html");
});

app.get('/seob17', function (req, res) {
  res.sendfile("object3.html");
});

console.log("running");

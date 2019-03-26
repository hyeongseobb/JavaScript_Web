var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);

app.get('/seob3', function (req, res) {
  res.sendfile("js.html");
});

app.get('/seob4', function (req, res) {
  res.sendfile("quiz.html");
});

app.get('/seob5', function (req, res) {
  res.sendfile("for.html");
});

console.log("running");

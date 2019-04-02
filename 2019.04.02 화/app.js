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

app.get('/seob6', function (req, res) {
  res.sendfile("quiz2.html");
});

app.get('/seob7', function (req, res) {
  res.sendfile("for2.html");
});

app.get('/seob8', function (req, res) {
  res.sendfile("for3.html");
});

app.get('/seob9', function (req, res) {
  res.sendfile("quiz3.html");
});

app.get('/seob10', function (req, res) {
  res.sendfile("for4.html");
});

app.get('/seob11', function (req, res) {
  res.sendfile("final.html");
});

console.log("running");

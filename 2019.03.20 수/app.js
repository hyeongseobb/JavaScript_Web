var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);

app.get('/', function (req, res) {
  res.send("재밌는 WEB");
});

app.get('/hyeongseob', function (req, res) {
  res.sendfile("quiz.html");
});

app.get('/table', function (req, res) {
  res.sendfile("이력서.html");
});

app.get('/seob', function (req, res) {
  res.sendfile("css속성연습.html");
});

app.get('/seob2', function (req, res) {
  res.sendfile("css속성연습2.html");
});

app.get('/seob3', function (req, res) {
  res.sendfile("js.html");
});

console.log("running");

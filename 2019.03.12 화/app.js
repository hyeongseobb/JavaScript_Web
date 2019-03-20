var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);

app.get('/', function (req, res) {
  res.send("초원이 다리는 백만불짜리다리");
});

app.get('/test', function (req, res) {
  res.send("아직 한발 남았다.");
});

app.get('/file', function (req, res) {
  res.sendfile("hello.html");
});

app.get('/file2', function (req, res) {
  res.send("wow");
});

app.get('/file3', function (req, res) {
  res.sendfile("dog.jpg");
});

app.get('/file4', function (req, res) {
  res.sendfile("file/dog2.jpg");
});

app.get('/file5', function (req, res) {
  res.sendfile("ghost.gif");
});

app.get('/file6', function (req, res) {
  res.sendfile("ghost2.gif");
});

app.get('/file7', function (req, res) {
  res.sendfile("polar bear.gif");
});

app.get('/file8', function (req, res) {
  res.sendfile("polar bear2.gif");
});

app.get('/file9', function (req, res) {
  res.sendfile("회원가입.html");
});

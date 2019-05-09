var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);

app.get('/seob', function (req, res) {
  res.sendfile("practice1.html");
});

app.get('/seob1', function (req, res) {
  res.sendfile("final.html");
});

app.get('/seob2', function (req, res) {
  res.sendfile("이형섭_중간고사.html");
});


console.log("running");

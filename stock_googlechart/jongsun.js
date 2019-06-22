var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);
var mysql = require('mysql');
var request = require('request');

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json());

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'webUI'
});

app.get('/', function(req, res) {
  res.send("MAIN");
});


app.get('/ajax', function(req, res) {
  res.sendfile("ajax.html");
});

app.post('/getPrice', function(req, res) {
  var myurl = req.body.myurl
  request.get(myurl, function(err, response, body) {
    body = JSON.parse(body);
    var price = (body.result.areas[0].datas[0].nv + "");
    res.send(price);
  })
});

console.log("running");

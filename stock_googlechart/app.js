var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);
var mysql = require('mysql');
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'wow'
});

app.get('/final', function (req, res) {
    res.sendfile('final.html');
});

var request = require('request');
app.get('/firstRequest', function (req, res) {
  request.get(`https://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:280360|SERVICE_RECENT_ITEM:280360,020560,090430,000660`, function(err, response, body) {
    body = JSON.parse(body);
    var price = body.result.areas[1].datas[0].nv +"";
    res.send(price);
  });
});

app.get('/secondRequest', function (req, res) {

  request.get(`https://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:000660|SERVICE_RECENT_ITEM:000660,280360,020560,090430`, function(err, response, body) {
    body = JSON.parse(body);
    var price = body.result.areas[1].datas[0].nv +"";
    res.send(price);
  });
});

app.get('/thirdRequest', function (req, res) {

  request.get(`https://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:090430|SERVICE_RECENT_ITEM:090430,000660,280360,020560`, function(err, response, body) {
    body = JSON.parse(body);
    var price = body.result.areas[1].datas[0].nv +"";
    res.send(price);
  });
});

app.get('/fourthRequest', function (req, res) {

  request.get(`https://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:003490|SERVICE_RECENT_ITEM:003490,090430,000660,280360,020560`, function(err, response, body) {
    body = JSON.parse(body);
    var price = body.result.areas[1].datas[0].nv +"";
    res.send(price);
  });
});

app.get('/fifthRequest', function (req, res) {

  request.get(`https://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:020560|SERVICE_RECENT_ITEM:020560,003490,090430,000660,280360`, function(err, response, body) {
    body = JSON.parse(body);
    var price = body.result.areas[1].datas[0].nv +"";
    res.send(price);
  });
});


console.log("running");

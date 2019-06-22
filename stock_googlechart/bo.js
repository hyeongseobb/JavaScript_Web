var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);
var mysql = require('mysql');
var bodyParser = require("body-parser");
var request = require('request');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

// 카카오, 네이버, SK하이닉스, LG전자, 삼성전자
var url = `https://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:035720|SERVICE_RECENT_ITEM:035720,035420,000660,066570,005930`

app.get('/final', function (req, res) {
  res.sendfile("boFinal.html");
});

app.get('/getPrice', function (req, res) {
  request.get(`${url}`, function (err, response, body) {
    body = JSON.parse(body);
    var select = Number(req.query.brand)
    var price = body.result.areas[1].datas[select].nv + ""
    res.send(price);
  });
});

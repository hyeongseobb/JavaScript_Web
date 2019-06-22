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

//*********** 서버에서 setInterval사용가능!*************
// setInterval(function(){
//   console.log("interval");
// }, 5000);
//****************************************************

app.get('/ajax', function (req, res) {
    res.sendfile('ajax.html');
});

var request = require('request');
app.get('/requestTest', function (req, res) {

  //********다른 외부 서버(naver주식 웹페이지)에 request보내서 주식가격을 가져온다.*********
  //&call_back 전까지의 url을 가져와야함!!
  request.get(`https://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:000660|SERVICE_RECENT_ITEM:000660,005930`, function(err, response, body) {
    body = JSON.parse(body);
    // 뒤에 ""을 더해줘야해
    var price = body.result.areas[1].datas[0].nv +"";

    //********가져온 실시간 주식가격으로 쿼리를 만들어 DB에 request 보내기*******
    var insertQuery = `insert stock (price) values("${price}")`;
    connection.query(insertQuery,
      function(err, rows, fields) {
        console.log(rows);
        if (err) throw err;
        //**********응답으로 dbRsult에 rows를 담고, price에 price를 담아줌.********
        res.send({dbResult:rows, price:price});
      }
    )
  });
});

app.get('/selectStock', function (req, res) {
  var selectQuery = `select * from stock`;
  connection.query(selectQuery,
    function(err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    }
  )
});


console.log("running");

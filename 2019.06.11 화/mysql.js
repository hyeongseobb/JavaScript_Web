var express = require('express'); // require = 가져다 쓰겠다
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);
var mysql = require('mysql');

var bodyParser = require("body-parser");
var request = require("request");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var connection = mysql.createConnection({ //mariaDB로 연결하겠다.
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'wow'
}); //내가 접속할 마리아DB에 대한 정보

app.get('/kakaoInfo', function(req, res) {
  res.sendfile("ajax.html"); //내가 kakaoInfo로 들어가면 ajax.html을 연결해줘
});

app.get('/requestkakao', function(req, res){
  request.get(`https://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:000660|SERVICE_RECENT_ITEM:000660,005930`,
     function(err, response, body){
     body = JSON.parse(body);
     var price = body.result.areas[0].datas[0].nv+""; //배열에서 찾아가기
     console.log(price)
    var insertQuery = `INSERT INTO stock (price) VALUES (${price});`;
     console.log(insertQuery);
      connection.query(insertQuery, function(err, rows, fields) {
           // if (err) throw err;
           console.log(rows);
           res.send(rows)
      })
    });
});

app.get('/selectPrice', function(req, res) { //select를 위한 곳
  var selectQuery = `SELECT * FROM stock`;
  connection.query(selectQuery, function(err, rows, fields) {
      res.send(rows);
    });
});

//전체 다 지우기
app.get('/allDelete', function(req, res) {
  var DeleteQuery = `Delete from stock`;
  //이 뒤에는 아무것도 붙여서는 안된다.
  connection.query(DeleteQuery, function(err, rows, fields) {
      res.send(rows);
      //저기 rows값만 출력하겠다.
      //Delete, TRUNCATE
    });
});



// html을 연결할 때는 sendfile이고 데이터를 보낼 때는 send임. 간단한데 왜 적어?! 하지말고 외우셈!!!!

//`Delete from news WHERE no=${indexNumber}`;
// Select / insert / Delete 등등
// row = 배열을 의미한다.

// 다하고 cmd확인해보면 mysql에서 한 것들이 뜬것을 볼수있다
// rows = 쿼리의 실행결과
// err = 에러
console.log("준비 완료");

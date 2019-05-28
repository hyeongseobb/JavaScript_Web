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
  host : 'localhost'
  , port : 3306
  , user : 'root'
  , password : 'root'
  , database: 'wow'
});

app.post('/select', function(req, res) {
  //아래에서 `delete * from seob_table`을 해주면 mysql에 있는 데이터들이 전부 삭제됨!
  var selectQuery = `select * from seob_table`;
  connection.query(selectQuery,
    function (err, rows, fields) {
      res.send(rows);
    }
  )
});

app.post('/input', function(req, res) {
  var writer = req.body.writer;
  var title = req.body.title;
  var text = req.body.text;

  var insertQuery = `insert seob_table (writer, title, text) values("${writer}", "${title}", "${text}")`;
  console.log(insertQuery);
  connection.query(insertQuery,
    function (err, rows, fields) {
      res.send(rows);
    }
  )
});

//*********************초기화면 띄울때는 무조건 get방식을 써줘야함*******************
app.get('/newList', function(req, res) {
  res.sendfile("newList.html");
});

app.get('/dataInsert', function(req, res) {
  res.sendfile("insert.html");
});

app.get('/dataDelete', function(req, res) {
  res.sendfile("delete.html");
});

app.get('/dataUpdate', function(req, res) {
  res.sendfile("update.html");
});

app.post('/delete', function(req, res) {
  var deleteQuery = `delete from seob_table`;
  console.log(deleteQuery);
  connection.query(deleteQuery,
    function (err, rows, fields) {
      res.send(rows);
    }
  )
});

app.post('/deleteOne', function(req, res) {
  var index = req.body.index;
  var deleteQuery2 = `delete from seob_table where no = ${index}`;
  console.log(deleteQuery2);
  connection.query(deleteQuery2,
    function (err, rows, fields) {
      res.send(rows);
    }
  )
});

app.post('/getNews', function(req, res) {
  var index = req.body.index;
  var newsQuery = `select * from seob_table where no = ${index}`;
  connection.query(newsQuery,
    function (err, rows, fields) {
      res.send(rows);
    }
  )
});

app.post('/updateOne', function(req, res) {
  var writer = req.body.writer;
  var title = req.body.title;
  var text = req.body.text;
  var index = req.body.index;
  var updateQuery = `update seob_table set writer="${writer}", title="${title}", text="${text}" where no="${index}"`;
  console.log(updateQuery);
  connection.query(updateQuery,
    function (err, rows, fields) {
      res.send("성공");
    }
  )
});

console.log("running");

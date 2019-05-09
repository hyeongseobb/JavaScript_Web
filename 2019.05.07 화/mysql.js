var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);
var mysql = require('mysql');

var connection = mysql.createConnection({
  host : 'localhost'
  , port : 3306
  , user : 'root'
  , password : 'root'
  , database: 'wow'
});

app.get('/select', function(req, res) {
  //아래에서 `delete * from seob_table`을 해주면 mysql에 있는 데이터들이 전부 삭제됨!
  var selectQuery = `select * from seob_table`;
  connection.query(selectQuery,
    function (err, rows, fields) {
      if (err) throw err;
      console.log(rows);
      res.send(rows);
    }
  )
});

console.log("running");

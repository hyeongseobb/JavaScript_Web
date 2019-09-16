var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);
var mysql = require('mysql');
var bodyParser = require("body-parser");

var connection = mysql.createConnection({
	host: 'localhost'
	, port: 3306
	, user: 'root'
	, password: 'root'
	, database: 'wow'
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function (req, res) {
  res.sendfile("html.html");
});

app.get('/selectData', function (req, res) {
	var selectQuery = `select * from post`;
	connection.query(selectQuery,
		function (err, rows, fields) {
			if (err) throw err;
      console.log(rows);
			res.send(rows);
		}
	);
});

app.post('/insertData', function (req, res) {
  var input = req.body;
	var insertQuery = `insert into post (title, content) values
	("${input.title}", "${input.content}")`;
	connection.query(insertQuery,
		function (err, rows, fields) {
			if (err) throw err;
			res.send(rows);
		}
	);
});

app.get('/factorial', function (req, res) {
  res.sendfile("factorial.html");
});

app.get('/calculation', function (req, res) {
  var number = req.query.number;
  var result = 1;
  for(var i = number; i > 1; i--) {
    result = result * i;
  }
  //response로 숫자 타입을 보낼수 없으므로 ""를 붙여 문자로 강제 형변환해줌.
  res.send(result+"");
});

app.get('/selectValue', function (req, res) {
	var query = `select no from post`;
	connection.query(query,
		function (err, rows, fields) {
			if (err) throw err;
      console.log(rows);
			res.send(rows);
		}
	);
});

app.post('/selectOrigin', function (req, res) {
  var input = req.body;
	var query = `select * from post where no = ${input.no}`;
	connection.query(query,
		function (err, rows, fields) {
			if (err) throw err;
      console.log(rows);
			res.send(rows);
		}
	);
});

app.get('/updateData', function (req, res) {
  res.sendfile("update.html");
});

app.post('/update', function (req, res) {
  var input = req.body;
	var updatetQuery = `update post set title = "${input.title}", content = "${input.content}" where no = ${input.no}`;
	connection.query(updatetQuery,
		function (err, rows, fields) {
			if (err) throw err;
			res.send(rows);
		}
	);
});


console.log("running");

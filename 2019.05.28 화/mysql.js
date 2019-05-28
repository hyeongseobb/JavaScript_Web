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

//*********************초기화면 띄울때는 무조건 get방식을 써줘야함*******************
app.get('/flightListPage', function(req, res) {
  res.sendfile("flightListPage.html");
});

app.get('/insertFlightPage', function(req, res) {
  res.sendfile("insertFlightPage.html");
});

app.get('/insertAircraftPage', function(req, res) {
  res.sendfile("insertAircraftPage.html");
});

//req.body를 input 이라는 변수에 담아서 표현하면 코드를 효과적으로 줄일 수 있음.
app.post('/insertFlight', function(req, res) {
  var flightName = req.body.flightName;
  var aircraftCode = req.body.aircraftCode;
  var departure = req.body.departure;
  var arrival = req.body.arrival;
  var departTime = req.body.departTime;
  var arrivalTime = req.body.arrivalTime;
  var insertQuery = `insert flight (flightName, aircraftCode, departure, arrival, departTime, arrivalTime) values("${flightName}", "${aircraftCode}", "${departure}", "${arrival}", "${departTime}", "${arrivalTime}")`;
  console.log(insertQuery);
  connection.query(insertQuery,
    function(err, rows, fields) {
      res.send(rows);
    }
  )
});

app.post('/insertAircraft', function(req, res) {
  var aircraftCode = req.body.aircraftCode;
  var aircraftName = req.body.aircraftName;
  var seats = req.body.seats;
  var insertQuery = `insert aircraft (aircraftCode, aircraftName, seats) values("${aircraftCode}", "${aircraftName}", ${seats})`;
  console.log(insertQuery);
  connection.query(insertQuery,
    function(err, rows, fields) {
      res.send(rows);
    }
  )
});

app.post('/selectFlight', function(req, res) {
  var index = req.body.index;
  var newsQuery = `select * from flight`;
  connection.query(newsQuery,
    function(err, rows, fields) {
      res.send(rows);
    }
  )
});

app.post('/selectAircraft', function(req, res) {
  var index = req.body.index;
  var newsQuery = `select * from aircraft`;
  connection.query(newsQuery,
    function(err, rows, fields) {
      res.send(rows);
    }
  )
});

app.post('/deleteFlight', function(req, res) {
  var index = req.body.index;
  var deleteQuery = `delete from flight where no = ${index}`;
  console.log(deleteQuery);
  connection.query(deleteQuery,
    function(err, rows, fields) {
      res.send(rows);
    }
  )
});

app.post('/deleteAircraft', function(req, res) {
  var index = req.body.index;
  var deleteQuery = `delete from aircraft where no = ${index}`;
  console.log(deleteQuery);
  connection.query(deleteQuery,
    function(err, rows, fields) {
      res.send(rows);
    }
  )
});

app.post('/joinTable', function(req, res) {
  var index = req.body.index;
  var joinQuery = `SELECT
	A.flightName,
	B.aircraftName,
	B.seats,
	A.departure,
	A.arrival,
	A.departTime,
	A.arrivalTime
FROM
flight A
Inner JOIN aircraft B
ON A.aircraftCode = B.aircraftCode`;
  console.log(joinQuery);
  connection.query(joinQuery,
    function(err, rows, fields) {
      res.send(rows);
    }
  )
});

console.log("running");

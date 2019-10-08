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

app.get('/admin', function(req, res) {
  res.sendfile("stock.html");
});

app.get('/manageItem', function(req, res) {
  res.sendfile("manageItem.html");
});

app.post('/selectItem', function(req, res) {
  var selectQuery = `select * from item`;
  connection.query(selectQuery,
    function(err, rows, fields) {
      res.send(rows);
    }
  )
});

app.post('/updateItem', function(req, res) {
  var no = req.body.no;
  var name = req.body.name;
  var price = req.body.price;
  var inventory = req.body.inventory;
  var onsale = req.body.onsale;
  var updateQuery = `update item set name="${name}", price="${price}", inventory="${inventory}", onsale="${onsale}" where no="${no}"`;
  connection.query(updateQuery,
    function(err, rows, fields) {
      res.send(rows);
    }
  )
});

app.post('/newProduct', function(req, res) {
  var name = req.body.name;
  var price = req.body.price;
  var inventory = req.body.inventory;
  var onsale = req.body.onsale;
  var insertQuery = `insert item (name, price, inventory, onsale) values("${name}", "${price}", "${inventory}", "${onsale}")`;
  connection.query(insertQuery,
    function(err, rows, fields) {
      console.log(rows)
      var selectQuery = `select * from item where no=${rows.insertId}`;
      connection.query(selectQuery,
        function(err, rows, fields) {
          res.send(rows);
        }
      )
    }
  )
});

console.log("running");

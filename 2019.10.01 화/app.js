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

app.get('/', function(req, res) {
  res.sendfile("main.html");
});

app.post('/selectItem', function(req, res) {
  var selectQuery = `select * from item`;
  connection.query(selectQuery,
    function(err, rows, fields) {
      res.send(rows);
    }
  )
});

app.get('/order', function(req, res) {
  res.sendfile("order.html");
});

app.post('/selectOneItem', function(req, res) {
  var no = req.body.no;
  var selectQuery = `select * from item where no=${no}`;
  connection.query(selectQuery,
    function(err, rows, fields) {
      res.send(rows);
    }
  )
});

app.post('/insertOrder', function(req, res) {
  var id = req.body.id;
  var itemNo = req.body.itemNo;
  var complete = req.body.complete;
  var quantity = req.body.quantity;
  var inventory = req.body.inventory;
  var remainInventory = inventory - quantity;
  console.log(remainInventory);
  if(remainInventory >= 0){
    var insertQuery = `insert ordertable (id, itemNo, complete, quantity) values("${id}", "${itemNo}", "${complete}", "${quantity}")`;
    connection.query(insertQuery,
      function(err, rows, fields) {
        var updateQuery = `update item set inventory=${remainInventory} where no="${itemNo}"`;
        connection.query(updateQuery,
          function(err, rows, fields) {
            res.send(rows);
          }
        )
      }
    )
  }
  else {
    res.send("재고부족");
  }
});
console.log("running");

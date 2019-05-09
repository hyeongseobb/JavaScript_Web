var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);

app.get('/test', function(req, res) {
  res.send("hello world");
});

app.get('/test2', function(req, res) {
  console.log(Number(req.query.a), Number(req.query.b));
  res.send(Number(req.query.a) + Number(req.query.b) + "");
});

app.get('/test3', function(req, res) {
  res.sendfile("multiply.html");
});

app.get('/test4', function(req, res) {
  var num1 = Number(req.query.num1);
  var num2 = Number(req.query.num2);
  var num3 = Number(req.query.num3);
  console.log(num1 * num2 * num3);
  res.send(`multiply is ${num1 * num2 * num3}`);
});

app.get('/test5', function(req, res) {
  res.sendfile("quiz.html");
});

app.get('/test6', function(req, res) {
  var number = Number(req.query.number);
  var arrGoods = ["item1", "item2", "item3", "item4", "item5", "item6", "item7"];
  var arrPrice = [1000, 5000, 10000, 30000, 50000, 100000, 500000];
  console.log(number);

  var resText = "구매불가";
  for (var i = 0; i < arrGoods.length; i++) {
    if(arrPrice[i] <= number) {
      resText = arrGoods[i]
    }
  }
  res.send(resText);
});



console.log("running");

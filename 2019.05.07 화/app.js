var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);

app.get('/test5', function(req, res) {
  res.sendfile("quiz.html");
});

app.get('/test6', function(req, res) {
  var price = Number(req.query.price);
  // var arrGoods = ["item1", "item2", "item3", "item4", "item5", "item6", "item7"];
  // var arrPrice = [1000, 5000, 10000, 30000, 50000, 100000, 500000];
  var itemPrice = [
    {itemName:"item1", price:1000},
    {itemName:"item2", price:5000},
    {itemName:"item3", price:10000},
    {itemName:"item4", price:30000},
    {itemName:"item5", price:50000},
    {itemName:"item6", price:100000},
    {itemName:"item7", price:500000},
  ];

  var resText = "구매불가";
  for (var i = 0; i < itemPrice.length; i++) {
    if(itemPrice[i].price <= price) {
      resText = itemPrice[i].itemName
    }
  }
  res.send(resText);
  //여기서 resText는 response가 된다.
});

app.get('/test7', function(req, res) {
  res.sendfile("quiz2.html");
});

app.get('/test8', function(req, res) {
  var carKind = Number(req.query.carKind);
  var carColor = Number(req.query.carColor);
  var arrCarKind = [2100, 1300, 1500, 3500, 3200];
  var arrCarColor = [100, 120, 200, 130, 80];
  var resResult = arrCarKind[carKind] + arrCarColor[carColor];
  //response를 보낼때 숫자로 보낼수없음!!!! 꼭 + ""를 붙여서 보내보자^^!
  // ""안붙여서 에러가 남
  res.send(resResult + "만원");
});

app.get('/test9', function(req, res) {
  res.sendfile("polar bear.gif");
});

app.get('/test10', function(req, res) {
  res.sendfile("dog.jpg");
});

app.get('/test11', function(req, res) {
  res.sendfile("Function.html");
});

app.get('/test12', function(req, res) {
  res.sendfile("quiz3.html");
});




console.log("running");

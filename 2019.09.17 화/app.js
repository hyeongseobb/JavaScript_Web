var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);
var mysql = require('mysql');
var bodyParser = require("body-parser");
var request = require('request');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

const cheerio = require('cheerio');
// const client = require("cheerio-httpcli");

app.get('/', function (req, res) {
  res.sendfile("mealbox.html");
});

app.get('/getMenu', function (req, res) {
  request.get({
    uri: "http://www.kopo.ac.kr/kangseo/content.do?menu=262"
  }, function (err, response, body) {
    let $ = cheerio.load(body);
    mealbox = $("td");
    menu = [];

    for (var i = 2; i <= mealbox.length; i = i + 4) {
      try {
        var item = {
          "day": mealbox[i - 2].children[1].next.data,
          "menu_list": mealbox[i].children[1].children[0].data.replace(/\n/gi, "").trim()
        }
        menu.push(item);

      } catch (e) {
        console.error('catch error: ', e.stack);
      }
    }
    res.send(menu);
  });
});

app.post('/create_xlsx', function (req, res) {
  var excelColumns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  var Excel = require('exceljs');
  var workbook = new Excel.Workbook();
  var sheet = workbook.addWorksheet('menu');

  var reqParam = JSON.parse(req.body.param);
  for(var i = 0; i < reqParam.length; i++) {
    //요일
    sheet.getCell(excelColumns[2 * i] + 1).value = reqParam[i].day;
    sheet.getCell(excelColumns[2 * i] + 1).fill = {
      type: 'pattern',
      pattern:'solid',
      fgColor:{argb:'FFCD853F'}
    };
    sheet.getCell(excelColumns[2 * i] + 1).font = {
      name: 'Arial Black',
      color: { argb: 'FFFFFAF0' },
      family: 2,
      size: 14,
      italic: true
    };
    //평균점수
    sheet.getCell(excelColumns[2 * i] + 9 ).value = "평균";
    sheet.getCell(excelColumns[2 * i] + 9 ).fill = {
      type: 'pattern',
      pattern:'solid',
      fgColor:{argb:'FFFFC0CB'}
    };
    sheet.getCell(excelColumns[(2 * i) + 1] + 9).value = reqParam[i].avg_score;
    sheet.getCell(excelColumns[(2 * i) + 1] + 9).fill = {
      type: 'pattern',
      pattern:'solid',
      fgColor:{argb:'FFFFF0F5'}
    };
    for(var j = 0; j < reqParam[i].menu_list.length; j++) {
      //메뉴
      sheet.getCell(excelColumns[2 * i] + (j+2)).value = reqParam[i].menu_list[j];
      sheet.getCell(excelColumns[2 * i] + (j+2)).border = {
        top: {style:'thin', color: {argb:'FFFFFFFF'}},
        left: {style:'thin', color: {argb:'FFFFFFFF'}},
        bottom: {style:'thin', color: {argb:'FFFFFFFF'}},
        right: {style:'thin', color: {argb:'FFFFFFFF'}}
      };
      sheet.getCell(excelColumns[2 * i] + (j+2)).fill = {
        type: 'pattern',
        pattern:'solid',
        fgColor:{argb:'FFF5F5DC'}
      };
      sheet.getCell(excelColumns[2 * i] + (j+2)).font = {
        name: 'Arial Black',
        color: { argb: 'FF000000' },
        family: 2,
        size: 9
      };
      //점수
      sheet.getCell(excelColumns[(2 * i) + 1] + (j+2)).value = reqParam[i].score[j];
      sheet.getCell(excelColumns[(2 * i) + 1] + (j+2)).border = {
        top: {style:'thin', color: {argb:'FFFFFFFF'}},
        left: {style:'thin', color: {argb:'FFFFFFFF'}},
        bottom: {style:'thin', color: {argb:'FFFFFFFF'}},
        right: {style:'thin', color: {argb:'FFFFFFFF'}}
      };
      sheet.getCell(excelColumns[(2 * i) + 1] + (j+2)).fill = {
        type: 'pattern',
        pattern:'solid',
        fgColor:{argb:'FFFFEFD5'}
      };
    }
  }

  workbook.xlsx.writeFile('menu.xlsx')
    .then(function () {
      res.send("Created Excel");
    });
});

const fs = require("fs");
var fileName = 'menu.xlsx';
app.get('/getExcelFile', function (req, res) {
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader("Content-Disposition", "attachment; filename=" + fileName);

  res.sendFile(__dirname + '/' + fileName, function(err){
    fs.unlinkSync(__dirname + '/' + fileName);
  });
});

var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);
var bodyParser = require("body-parser");
var request = require('request');
var mysql = require('mysql');

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
app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/form.html');
});

var user_list = [];
var users = [];

var io = require('socket.io').listen(server);

io.on('connection', function (socket) {
  socket.on('joinRoom', function (userName) {
    socket.join("chatroom");
    user_list.push({
      userName: userName,
      socketId: socket.id
    });

    var selectQuery = `select * from (select * from chat a order by a.no desc limit 15) b order by b.no asc;`;
    connection.query(selectQuery,
      function (err, rows, fields) {
        if (err) throw err;
        console.log(rows)
        socket.emit("pastchat", rows);
      }
    );
    users.push({
      userName: userName
    });

    io.emit('userlist', users);

    socket.broadcast.to("chatroom").emit('enter', {
      userName: userName
    });
    console.log(user_list);
  });

  socket.on('disconnect', function () {
    for (i = 0; i < user_list.length; i++) {
      if (user_list[i].socketId == socket.id) {
        socket.broadcast.to("chatroom").emit('exit', {
          userName: users[i].userName
        });
        user_list.splice(i, 1)
        users.splice(i, 1)
        break;
      }
    }
    console.log('disconnected:', socket.id)
    console.log(user_list);
    io.emit('userlist', users);
  });

  socket.on('message', function (params) {
    var userName;
    var text = params.msg;
    for (i = 0; i < user_list.length; i++) {
      if (user_list[i].socketId == socket.id) {
        userName = user_list[i].userName
        break;
      }
    }
    var insertQuery = `insert into chat (id, text) values ("${userName}", "${text}")`;
    connection.query(insertQuery,
      function (err, rows, fields) {
        if (err) throw err;
        console.log(rows)
      }
    );
    socket.broadcast.to("chatroom").emit('newChatMsg', {
      userName: userName,
      msg: params.msg

    });
  });
});

app.post('/check_users', function (req, res) {
  var user = req.body.user;
  console.log('user_list:', user_list);
  for (i = 0; i < user_list.length; i++) {
    if (user_list[i].userName == user) {
      res.send("로그인실패");
      return
    }
  }

  res.send("로그인성공");
});

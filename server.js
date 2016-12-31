var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const path = require('path');
var JsonDB = require('node-json-db');

var settingDB = new JsonDB("settings", true, true);
var userDB = new JsonDB("users", true, true);

var userLib = require('./assets/libs/user.js');

app.get('/*', function(req, res){
  var url = req.url.split("?")[0];
  url = url.replace(/\.\.\//g, "");
  if (url === "/") url = "index.html";
  var file = path.join(__dirname, "assets/html/", url);
	
  res.sendFile(file);
});

var mime = {
  ".js": "text/javascript",
  ".html": "text/html",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpg",
  ".gif": "image/gif"
};

io.on('connection', function(socket){

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
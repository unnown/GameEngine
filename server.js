var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var userLib = require('./assets/libs/user.js');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/assets/html/index.html');
});

var mime = {
  ".js": "text/javascript",
  ".html": "text/html",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpg",
  ".gif": "image/gif"
};

app.get('/', (function(req, res) {
  var url = req.url.split("?")[0];
  url = url.replace(/\.\.\//g, "");
  if (url === "/") url = "html/index.html";
  var file = path.join(__dirname, "assets/html/", url);
  var ext = path.extname(url);
  var ctype = mime[ext];
  ctype = ctype || "text/plain";

  var headersSent = false;
  var stream = fs.createReadStream(file);
  stream.on("error", function(error) {

    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end(error.toString());

  }).on("data", function(data) {

    if (!headersSent) {
      headersSent = true;
      res.writeHead(200, { "Content-Type": ctype });
    }

    res.write(data);
  }).on("end", function() {
    res.end();
  });
}));

io.on('connection', function(socket){

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
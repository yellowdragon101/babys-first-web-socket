const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
    console.log('user:' + msg);
  });
});

http.listen(port, function() {
  console.log(`listening on *:${port}`);
});
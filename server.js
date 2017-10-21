var express = require('express');
var path = require('path');
var socket = require('socket.io');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

var server = app.listen(3000, () => {
	console.log('Server running on port 3000.');
});

var io = socket(server);

io.on('connection', (socket) => {
	console.log('Socket connection established!');

	socket.on('chat', (data) => {
		io.sockets.emit('chat', data);
	});

	socket.on('typing', (data) => {
		socket.broadcast.emit('typing',data);
	});
});

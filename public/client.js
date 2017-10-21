
var socket = io.connect('http://localhost:3000');

var message = document.getElementById('message'),
	handle = document.getElementById('handle'),
	output = document.getElementById('output'),
	btn = document.getElementById('send');
	feedback = document.getElementById('feedback');

btn.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});

message.addEventListener('keypress', () => {
	socket.emit('typing', handle.value);
});

socket.on('chat', (data) => {
	message.value = "";
	handle.value = "";
	feedback.innerHTML = "";
	output.innerHTML += "<p>" + data.handle + ": " + data.message + "</p>";
});

socket.on('typing', (data) => {
	feedback.innerHTML = data + " is typing..";
});
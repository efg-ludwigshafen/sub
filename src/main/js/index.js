var app = require('express')()
	, path = require('path')
	, http = require('http').Server(app)
	, io = require('socket.io')(http)
	, request = require('request');

app.get('/', function(req, res) {
	res.sendFile(path.resolve(__dirname, '..', 'html', 'index.html'));
});

app.get('/source', function(req, res) {
	res.sendFile(path.resolve(__dirname, '..', 'html', 'source.html'));
});

app.get('/:locale', function(req, res) {
	res.sendFile(path.resolve(__dirname, '..', 'html', 'target.html'));
});

io.on('connection', function(socket) {
	socket.on('joinrequest', function(room) {
		socket.join(room);
	});

	socket.on('chunk', function(message) {
		Object.keys(io.sockets.adapter.rooms)
			.filter(function(room) { return room[0] !== '/'; })
			.forEach(function(room) {
				request(process.env.npm_package_config_translateapi + '?q=' + message + '&target=' + room, function(err, _, json) {
					io.to(room).emit('chunk', JSON.parse(json));
				})
			});
	});
});

http.listen(process.env.npm_package_config_port || 3000, function() {
	console.log('listening on *:' + (process.env.npm_package_config_port || 3000)); 
});

var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');

var routes = require('./routes');

app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-Method-Override'));
app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, '/public')));

app.set('views', './views');
app.set('view engine', 'jade');

app.use('/', routes);

server.listen(8080, function(){
	var port = server.address().port;

	console.log("\nServidor rodando na porta => http://localhost:" + port + "\nCTRL + C para Sair.");
});

io.sockets.on('connection', function(client){
	console.log('a user connected');
	client.on('disconnect', function(){
		console.log('user disconnected');
		client.onclose();
	});

	client.on('createPost', function(data){
		io.sockets.emit('createClient', data);
	});
});
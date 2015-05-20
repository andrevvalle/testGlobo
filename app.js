var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
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
app.use(function(req, res, next){
  res.render('404', { status: 404, url: req.url });
});

server.listen(process.env.PORT || 3000, function(){
	console.log("\nServidor rodando na porta => http://localhost:", server.address().port, app.settings.env);
});
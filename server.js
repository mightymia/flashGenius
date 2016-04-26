var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

//port to use for Heroku
var port = process.env.PORT || 3000;
var server = app.listen(port, function(){
	console.log('listening to' + port);
})

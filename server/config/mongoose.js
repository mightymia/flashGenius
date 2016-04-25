var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };       
 
var mongodbUri = 'mongodb://mclapham10:Shanny14$@ds019491.mlab.com:19491/heroku_nvx8kh20';
 
mongoose.connect(mongodbUri, options);
var conn = mongoose.connection;             
 
conn.on('error', console.error.bind(console, 'connection error:'));  
 
conn.once('open', function() {
  // Wait for the database connection to establish, then start the app.                         
});


// mongoose.connect('mongodb://localhost/flashGenius');

var models_path = __dirname + '/../models';

fs.readdirSync(models_path).forEach(function(file){
	if(file.indexOf('.js') > 0){
		require(models_path + '/' + file);
	}
})


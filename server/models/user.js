var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
	created_at: {type: Date, default: Date.now},
	image: {type: String, default: 'https://s3.amazonaws.com/uifaces/faces/twitter/idiot/128.jpg'}
});

var User = mongoose.model('User', userSchema);
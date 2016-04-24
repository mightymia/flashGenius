var mongoose = require('mongoose');

var cardSchema = new mongoose.Schema({
	username: {type: String, require: true},
	createdAt: {type: Date, default: Date.now},
	topic: {type: String, require: true},
	question: {type: String, require: true},
	frontImage: {type: String},
	option1: {type: String},
	option2: {type: String},
	option3: {type: String},
	option4: {type: String},
	answer: {type: String, require: true},
	backImage: {type: String},
	sourceInfo: {type: String}

});

var Card = mongoose.model('Card', cardSchema);
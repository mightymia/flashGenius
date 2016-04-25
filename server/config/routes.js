var users = require('./../controllers/users.js');
var cards = require('./../controllers/cards.js')


module.exports = function(app){
//-----------User Routes-------------//
	app.post('/newUser', function(req, res){
		users.create(req, res);
	})

	app.get('/users', function(req, res){
		users.show_all(req, res);
	})

	app.post('/user', function(req, res){
		users.show(req, res);
	})

	app.post('/updateUser', function(req, res){
		users.update(req, res);
	})

//--------Card Routes--------//
	app.post('/newCard', function(req, res){
		cards.create(req, res);
	})

	app.get('/topics', function(req, res){
		cards.show_all(req, res);
	})

	app.post('/stack', function(req, res){
		cards.get_stack(req, res);
	})

	app.post('/userStack', function(req, res){
		cards.get_userStack(req, res);
	})

	app.post('/viewCard', function(req, res){
		cards.get_card(req, res);
	})

	app.post('/removeCard', function(req, res){
		cards.remove(req, res);
	})

	app.post('/updateCard', function(req, res){
		cards.update(req, res);
	})
}
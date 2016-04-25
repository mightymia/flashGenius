var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (function(){
	return {
		//show all users
		show_all: function(req, res){
			User.find({}, function(err, results){
				if(err)
				{
					console.log(err);
				}
				else
				{
					res.json(results);
				}
			})
		},

		//create new user
		create: function(req, res){
			var user = new User(req.body);
			user.save(function(err){
				if(err)
				{
					console.log(err);
					res.json(err);
				}
				else
				{
					res.json(user);
				}
			})
		},

		//show user
		show: function(req, res){
			User.find(req.body, function(err, user){
				if(err)
				{
					console.log(err);
				}
				else
				{
					res.json(user);
				}
			})
		},

		//update user
		update: function(req, res){
			console.log('users', req.body);
			User.update({username: req.body.username}, {$set: {image: req.body.image}}, function(err, user){
				if(err){
					console.log(err);
				}
				else{
					User.find({username: req.body.username}, function(err, user){
						if(err){
							console.log(err)
						}
						else{
							res.json(user);
						}
					})
				}
			})
		}
	}
})();
var mongoose = require('mongoose');
var Card = mongoose.model('Card');

module.exports = (function(){
	return {
		// get all distinct topics
		show_all: function(req, res){
			Card.find().distinct('topic', function(err, results){
				if(err){
					console.log(err);
				}
				else{
					res.json(results);
				}
			})
		},

		//show all cards in topic
		get_stack: function(req, res){
			Card.find({topic:req.body.topic}, function(err, results){
				if(err){
					console.log(err);
				}
				else{
					res.json(results);
				}
			})
		},

		//create card
		create: function(req, res){
			var card = new Card(req.body);
			card.save(function(err){
				if(err){
					console.log(err);
					res.json(err);
				}
				else{
					res.json(card);
				}
			})
		},

		//get user's cards
		get_userStack: function(req, res){
			console.log(req.body);
			Card.find({username: req.body.username}, function(err, results){
				if(err){
					console.log(err);
				}
				else{
					res.json(results);
				}
			})
		},

		//show card
		get_card: function(req, res){
			Card.find({question: req.body.question}, function(err, card){
				if(err){
					console.log(err);
				}
				else{
					res.json(card);
				}
			})
		},

		//update card
		update: function(req, res){
			Card.update({_id: req.body._id},{$set: {
													question: req.body.question,
													frontImage: req.body.frontImage,
													option1: req.body.option1,
													option2: req.body.option2,
													option3: req.body.option3,
													option4: req.body.option4,
													answer: req.body.answer,
													backImage: req.body.backImage,
													sourceInfo: req.body.sourceInfo}

			}, function(err, card){
				if(err){
					console.log(err);
				}
				else{
					res.json(card);
				}
			})
		},

		//delete card
		remove: function(req, res){
			Card.findOne(req.body, function(err, card){
				if(err){
					console.log(err);
				}
				else{
					Card.remove(req.body, function(err, card){
						if(err){
							console.log(err);
						}
						else{
							res.json(card);
						}
					})
				}
			})
		},
	}
})();
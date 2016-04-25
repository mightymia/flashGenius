myApp.factory('myAppFactory', function($http){
	var factory = {};
	var users = [];
	factory.user = {};
	var user = {};
	var cards = [];
	var topics = [];
	var card = {};
	var userStack = [];
	var errors = [];
	var stack = [];
	var date = Date.now();
	var angularErrors = [];

//-----------User Functions----------//
//get all users
	factory.getUsers = function(callback){
		$http.get('/users').success(function(output){
			users = output;
			callback(users);
		})
	}

//get logged in user
	factory.getUser = function(info, callback){
		$http.post('/user', info).success(function(output){
			factory.user = output;
			callback(factory.user);
		})
	}

//get logged in user's details
	factory.getUserDetails = function(callback){
		callback(factory.user);
	}

//add user
	factory.addUser = function(info, callback){
		$http.post('/newUser', info).success(function(output){
			users.push({
				username: info.username,
				password: info.password,
				created_at: Date.now()
			});
			factory.user = output;
			callback(factory.user);
		})
	}

//check is user is new
	factory.isUserNew = function(newUserName){
		for (var i = 0; i < users.length; i++) {
			if(users[i].username == newUserName){
				return false;
			}
		}
		return true;
	}

//update user's avatar
	factory.updateUser = function(info, username, callback){
		info.username = username;
		$http.post('/updateUser', info).success(function(output){
			factory.user = output;
			callback(factory.user)
		});
	}

//get another user's profile
	factory.getUserProfile = function(info, callback){
		var username = {username: info};
		$http.post('/user', username).success(function(output){
			user = output
			callback(user);
		});
	}

//---------Card Functions-----------//

//card creation validation
	factory.cardValidation = function(info, username, callback){
		info.username = username;
		angularErrors = [];
	//Topic
		if(info.topic == null){
			angularErrors.push('Topic is required');
		}
	//Question
		if(info.question == null || info.question == ""){
			angularErrors.push('Question is required');
		}
	//Answer
		if(info.answer == null || info.answer == ""){
			angularErrors.push('Answer is required');
		}
	//Images
		if(info.frontImage != null  || info.frontImage == ""){
			var frontImageExtension = info.frontImage.slice(-3);
			if(frontImageExtension != "jpg" && frontImageExtension != "png" && frontImageExtension !="gif"){
				angularErrors.push('Front image must end in .jpg, .png or .gif');
			}
		}
		if(info.backImage != null  || info.backImage == ""){
			var backImageExtension = info.backImage.slice(-3);
			if(backImageExtension != "jpg" && backImageExtension != "png" && backImageExtension !="gif"){
				angularErrors.push('Back image must end in .jpg, .png or .gif');
			}
		}
		callback(angularErrors);
	}

//add card
	factory.addCard = function(info, username, callback){
		info.username = username;
		errors = [];
		$http.post('/newCard', info).success(function(output){
			if(output.errors){
				errors.push(output.errors);
				console.log(errors);
			}
			else{
				userStack.push({
					creator: info.username,
					createdAt: Date.now(),
					topic: info.topic,
					question: info.question,
					frontImage: info.frontImage,
					option1: info.option1,
					option2: info.option2,
					option3: info.option3,
					option4: info.option4,
					answer: info.answer,
					backImage: info.backImage,
					sourceInfo: info.sourceInfo
				});
			}
			callback(userStack);
		})
	}

//update card
	factory.updateCard = function(card, callback){
		errors = [];
		$http.post('/updateCard', card).success(function(output){
			if(output.errors){
				errors.push(output.errors);
				console.log(errors);
			}
			else{
				for (var i = 0; i < userStack.length; i++){
					if(userStack[i]._id == card._id){
						userStack.splice(i, 1, card);
					}
				};
			}
			callback(userStack);
		})
	}

//delete card
	factory.removeCard = function(card, callback){
		$http.post('/removeCard', card).success(function(output){
			for (var i = 0; i < userStack.length; i++){
				if(userStack[i] == card){
					userStack.splice(i, 1);
				}
			};
		})
	}

//get topics
	factory.getTopics = function(callback){
		$http.get('/topics').success(function(output){
			topics = output;
			callback(topics);
		})
	}

//get stack per topic
	factory.getStack = function(info, callback){
		var data = {topic: info};
		$http.post('/stack', data).success(function(output){
			stack = output;
			callback(stack);
		})
	}

//get user stack
	factory.getUserStack = function(info, callback){
		var data = {username: info};
		$http.post('/userStack', data).success(function(output){
			userStack = output;
			callback(userStack);
		})
	}

//get card
	factory.getCard = function(info, callback){
		var data = {question: info};
		$http.post('/viewCard', data).success(function(output){
			card = output;
			callback(card);
		})
	}

//-----------Return Errors-------------//

	factory.getErrors = function(){
		return errors;
	}

	factory.getAngularErrors = function(){
		return angularErrors;
	}

	return factory;
})
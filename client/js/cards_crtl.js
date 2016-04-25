myApp.controller('cardsController', function($location, myAppFactory){
	var _this = this;

//get topics
	this.getTopics = function(){
		myAppFactory.getTopics(function(data){
			_this.topics = data;
		})
	}

//add new card	
	this.addCard = function(username){
		$('#error').addClass('hide');
		myAppFactory.cardValidation(_this.newCard, username, function(angularErrors){
			if(angularErrors.length == 0){
				myAppFactory.addCard(_this.newCard, username, function(cards){
				_this.errors = myAppFactory.getErrors();
					if(_this.errors.length == 0){
						_this.userCards = cards;
						$location.path('/viewProfile');
						_this.newCard = {};
					}
					else{
						$('#error').removeClass('hide');
						_this.newCard = {};
					}
				});
			}
		else{
				$('#error').removeClass('hide');
				_this.angularErrors = angularErrors;
			}
		});
	}

//get stack of cards per topic
	this.getStack = function(data){
		myAppFactory.getStack(data, function(stack){
			_this.stack = stack;
			getCards(_this.stack);
		});
	}

//set up for navigating through stack
	var getCards = function(stack){
		_this.selectedIndex = 0;
		_this.orientation = 'next';
		_this.selectedCard = stack[_this.selectedIndex];
	}

//get a user's cards	
	this.getUserCards = function(name){
		myAppFactory.getUserStack(name, function(userCards){
			_this.userCards = userCards
		})
	}

//get an individual card
	this.getCard = function(data){
		myAppFactory.getCard(data, function(card){
			_this.card = card;
		})
	}

//delete card
	this.removeCard = function(data){
		myAppFactory.removeCard(data, function(userCards){
			_this.userCards = userCards;
		})
	}

//update card content
	this.updateCard = function(data){
		var username = data.username;
		$('#error').addClass('hide');
		myAppFactory.cardValidation(data, username, function(angularErrors){
			if(angularErrors.length == 0){
				myAppFactory.updateCard(data, function(userCards){
					_this.errors = myAppFactory.getErrors();
					if(_this.errors.length == 0){
						_this.userCards = userCards;
						$location.path('/viewProfile/');
					}
					else{
						$('#error').removeClass('hide');
					}
				});
			}
			else{
				$('#error').removeClass('hide');
				_this.angularErrors = angularErrors;
			}
		});
	}

//variable for card navigation array index
	var selectedIndex = 0;

//move to previous card in stack
	this.previousCard = function(){
		_this.orientation = "previous";
		if(--selectedIndex < 0){
			selectedIndex = (_this.stack.length - 1);
		}
		_this.selectedCard = _this.stack[selectedIndex];
	}

//move to next card in stacl
	this.nextCard = function(){
		_this.orientation = 'next';
		if(++selectedIndex >= _this.stack.length){
			selectedIndex = 0;
		}
			_this.selectedCard = _this.stack[selectedIndex];
	}
});
myApp.controller('usersController', function($location, myAppFactory){
	var _this = this;

//get all users
	myAppFactory.getUsers(function(data){
		_this.users = data;
	})

//get logged in user details
	myAppFactory.getUserDetails(function(data){
		_this.user = data;
	})

//get errors from server
	this.errors = myAppFactory.getErrors();

//get and or add user
	this.getUser = function(){
		if(myAppFactory.isUserNew(this.newUser.username) === true)
		{
			myAppFactory.addUser(this.newUser, function(user){
				myAppFactory.getUser(user, function(data){
					_this.user = data;
					$location.path('/viewProfile');
					_this.newUser = {};
				});
			});
		}
		else
		{
			myAppFactory.getUser(this.newUser, function(data){
				_this.user = data;
				$location.path('/dashboard'); 
				_this.newUser = {};
			});
		}
	}

//update user avatar
	this.updateUser = function(username){
		debugger;
		$('#errors').addClass('hide');
		myAppFactory.avatarValidation(_this.newImage, function(angularErrors){
			if(angularErrors.length == 0){
				debugger;
				myAppFactory.updateUser(_this.newImage, username, function(data){
					_this.user = data
					_this.newImage = {};
				});
			}
			else{
				$('#error').removeClass('hide');
				_this.angularErrors = angularErrors;
			}
		});
	}

//get another user profile
	this.getUserProfile = function(username){
		myAppFactory.getUserProfile(username, function(user){
			_this.userProfile = user;
		})
	}

});
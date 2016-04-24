var myApp = angular.module('myApp', ['ngRoute','ngAnimate']);

	myApp.config(function($routeProvider){
		$routeProvider
		.when('/', {
			templateUrl: 'partials/login.html'
		})
		.when('/dashboard', {
			templateUrl: 'partials/dashboard.html'
		})
		.when('/create', {
			templateUrl: 'partials/createCard.html'
		})
		.when('/stack/:topic', {
			templateUrl: 'partials/viewCards.html'
		})
		.when('/viewProfile', {
			templateUrl: 'partials/viewProfile.html'
		})
		.when('/viewCard', {
			templateUrl: 'partials/viewCard.html'
		})
		.when('/editCard', {
			templateUrl: 'partials/editCard.html'
		})
		.when('/viewUserProfile/:username', {
			templateUrl: 'partials/viewUserProfile.html'
		})
		.otherwise({
			redirectTo: '/'
		});
	})
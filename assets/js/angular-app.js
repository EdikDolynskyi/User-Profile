var app = angular.module('myApp', ['ngRoute', 'ngResource', 'ngFileUpload', 'ui.bootstrap']);

app.config(function ($routeProvider, $locationProvider) {

	$routeProvider.
		when('/', {
			templateUrl: 'js/user-profile/user-profile.html',
			controller: 'UserProfileController'
		}).
		when('/search', {
			templateUrl: 'js/main-page/user-search.html',
			controller: 'MainController'
		}).
		when('/cv', {templateUrl: 'js/cv/cv.html'}).
		when('/pdp', {templateUrl: 'js/pdp/pdp.html'}).
		when('/adminach', {templateUrl: 'js/admin/achievements.html'}).
		when('/admincert', {templateUrl: 'js/admin/certifications.html'}).
		when('/adminpdp', {templateUrl: 'js/admin/adminpdp.html'}).
		otherwise({ redirectTo: '/' });
		 $locationProvider.html5Mode(false);
});

app.controller('TabsCtrl', function ($scope, $window, $location) {
	$scope.tabs = [
		{ title:'My profile', href:'/' },
		{ title:'My experience', href:'/cv' },
		{ title:'PDP flow', href:'/pdp' },
		{ title: 'Admin achievements', href: '/adminach'},
		{ title: 'Admin certifications', href: '/admincert'},
		{ title: 'Admin pdp', href: '/adminpdp'}
	];
	$scope.changeHash = function(data) {
		$location.path(data);
	};

});

module.exports = app;



(function () {
    var app = angular.module('myApp', ['ngRoute','ui.bootstrap']);

    app.config(function ($routeProvider, $locationProvider) {
        $routeProvider.
            when('/', {templateUrl: 'js/user-profile/user-profile.html'}).
            when('/cv', {templateUrl: 'js/cv/cv.html'}).
            when('/pdp', {templateUrl: 'js/pdp/pdp.html'}).
            otherwise({ redirectTo: '/' });
	         $locationProvider.html5Mode(true);
    });

    app.controller('TabsCtrl', function ($scope, $window) {
		$scope.tabs = [
		    { title:'My profile', content:'My profile' },
		    { title:'myCV', content:'myCV' },
		    { title:'PDP flow', content:'PDP flow' }
    
  ];});

    app.controller('GreetingCtrl', function () {
        this.greeting = "Hello, it`s a "
    });


})();


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

    app.controller('TabsCtrl', function ($scope, $window, $location) {
		$scope.tabs = [
		    { title:'My profile', href:'/' },
		    { title:'myCV', href:'/cv' },
		    { title:'PDP flow', href:'/pdp' }
		];
		$scope.changeHash = function(data) {
  			$location.path(data);
		};
    
  }); 


})();

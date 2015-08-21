var app = angular.module('myApp', ['ngRoute', 'ngResource', 'ngFileUpload', 'ui.bootstrap']);

app.config(function ($routeProvider, $locationProvider) {

	$routeProvider.
		when('/', {
			templateUrl: 'js/user-profile/user-profile.html',
			controller: 'UserProfileController'
		})
		when('/search', {
			templateUrl: 'js/main-page/user-search.html',
			controller: 'MainController'
		}).
		when('/userpage', {
			templateUrl: 'js/user-profile/user-profile-public.html',
			controller: 'UserProfilePublicController'
		}).
		when('/admin', {
			templateUrl: 'js/user-profile/user-profile-admin.html',
			controller: 'UserProfileAdminController'
		}).
		when('/cv', {templateUrl: 'js/cv/cv.html'}).
		when('/pdp', {templateUrl: 'js/pdp/pdp.html'}).
		when('/adminach', {templateUrl: 'js/admin/achievements.html'}).
		when('/admincert', {templateUrl: 'js/admin/certifications.html'}).
		when('/adminpdp', {templateUrl: 'js/admin/adminpdp.html'}).
		when('/admintechdata', {templateUrl: 'js/admin/admintechdata.html'}).
		otherwise({ redirectTo: '/' });
		 $locationProvider.html5Mode(false);
});

app.controller('TabsCtrl', function ($scope, $window, $location, $rootScope) {
    if ($rootScope.isAdmin) {
        $scope.tabs = [
            {title: 'User profile', href: '/userpage'},
            {title: 'User experience', href: '/cv'},
            {title: 'User PDP flow', href: '/pdp'},
            {title: 'Admin', href: '/admin'},
            {title: 'Admin achievements', href: '/adminach'},
            {title: 'Admin certifications', href: '/admincert'},
            {title: 'Admin pdp', href: '/adminpdp'},
            {title: 'Admin tech data', href: '/admintechdata'}
        ]
    }
    else {
        $scope.tabs = [
            {title: 'My profile', href: '/'},
            {title: 'My experience', href: '/cv'},
            {title: 'PDP flow', href: '/pdp'}
        ]
    }

	$scope.changeHash = function(data) {
		$location.path(data);
	};

});

module.exports = app;


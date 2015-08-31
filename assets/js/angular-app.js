var app = angular.module('myApp', ['ngRoute', 'ngCookies', 'ngResource', 'ngFileUpload', 'ui.bootstrap']);

app.config(function ($routeProvider) {
	var prefix = window.location.pathname;

	$routeProvider.
		when('/', {
			templateUrl: prefix + 'js/up/up.html',
			controller: 'UserProfileController'
		}).
		when('/search', {
			templateUrl: prefix + 'js/main-page/user-search.html',
			controller: 'MainController'
		}).
		when('/userdata/:userId', {
			templateUrl:  prefix + 'js/up/up-data.html',
			controller: 'userProfileDataController'
		}).
		when('/adminup', {
			templateUrl: prefix + 'js/admin/up-admin.html',
			controller: 'UserProfileAdminController'
		}).
		when('/cv', {templateUrl: prefix + 'js/cv/cv.html'}).
		when('/pdp', {templateUrl: prefix + 'js/pdp/pdp.html'}).
		when('/adminach', {templateUrl: prefix + 'js/admin/achievements.html'}).
		when('/admincert', {templateUrl: prefix + 'js/admin/certifications.html'}).
		when('/adminpdp', {templateUrl: prefix + 'js/admin/adminpdp.html'}).
		when('/admintechdata', {templateUrl: prefix + 'js/admin/admintechdata.html'}).
		otherwise({ redirectTo: '/' });
});

app.controller('TabsCtrl', function ($scope, $window, $location, $rootScope) {
    var vm = this;
	if ($rootScope.isAdmin) {
		vm.tabs = [
            {title: 'User profile', href: '/userdata'},
            {title: 'User experience', href: '/cv'},
            {title: 'User PDP flow', href: '/pdp'},
            {title: 'Admin', href: '/adminup'},
            {title: 'Admin achievements', href: '/adminach'},
            {title: 'Admin certifications', href: '/admincert'},
            {title: 'Admin pdp', href: '/adminpdp'},
            {title: 'Admin tech data', href: '/admintechdata'}
        ]
    }
    else {
		vm.tabs = [
            {title: 'My profile', href: '/', active: true},
            {title: 'My experience', href: '/cv', couldBeHidden: true},
            {title: 'PDP flow', href: '/pdp', couldBeHidden: true}
        ]
    }

	vm.isMyProfile = function () {
		return $rootScope.ownerId == $rootScope.userId;
	};
	vm.changeHash = function(data) {
		$rootScope.userId = $rootScope.ownerId;
		$location.path(data);
	};
	vm.deactivateUserProfileTab = function() {
		vm.tabs[0].active = false;
	};

});
module.exports = app;


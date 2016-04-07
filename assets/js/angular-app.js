var app = angular.module('myApp', ['ngRoute', 'ngCookies', 'ngResource', 'ngMessages', 'ngFileUpload', 'ui.bootstrap',
	'ngclipboard']);
app.constant('prefix', window.location.pathname.slice(0, -1));
//app.constant('prefix', '/profile/');
app.config(function ($routeProvider, prefix) {
	$routeProvider.
		when('/', {
			templateUrl: prefix + '/js/up/up.html',
			controller: 'UserProfileController',
			controllerAs: 'ctrl'
		}).
		when('/search', {
			templateUrl: prefix + '/js/main-page/user-search.html',
			controller: 'MainController'
		}).
		when('/projects/:projectId', {
			templateUrl:  prefix + '/js/projects/projects.html'
		}).
		when('/userdata/:userId', {
			templateUrl:  prefix + '/js/up/up-data.html'
		}).
		when('/shared/userdata/:serverId', {
			templateUrl:  prefix + '/js/up/up-data.html'
		}).
		when('/adminup', {
			templateUrl: prefix + '/js/admin/up-admin.html'
		}).
		when('/cv', {templateUrl: prefix + '/js/cv/cv.html'}).
		when('/pdp', {templateUrl: prefix + '/js/pdp/pdp.html'}).
		when('/adminach', {templateUrl: prefix + '/js/admin/achievements.html'}).
		when('/admincert', {templateUrl: prefix + '/js/admin/certifications.html'}).
		when('/adminpdp', {templateUrl: prefix + '/js/admin/adminpdp.html'}).
		when('/admintechdata', {templateUrl: prefix + '/js/admin/admintechdata.html'}).
		otherwise({ redirectTo: '/' });
});

app.controller('TabsCtrl', function ($scope, $window, $location, $rootScope) {
    var vm = this;
	if ($rootScope.isAdmin) {
		vm.tabs = [
			//{title: 'My profile', href: '/userdata'},
            {title: 'My profile', href: '/'},
            {title: 'My experience', href: '/cv'},
            {title: 'My PDP flow', href: '/pdp'},
            {title: 'User Profile', href: '/adminup'},
			{title: 'User PDP flow', href: '/adminpdp'},
            {title: 'Achievements', href: '/adminach'},
            {title: 'Certifications', href: '/admincert'},
            {title: 'Categories', href: '/admintechdata'}
        ]
    }
    else {
		vm.tabs = [
            {title: 'My profile', href: '/', active: true},
            {title: 'My experience', href: '/cv'},
            {title: 'PDP flow', href: '/pdp'},
            {title: 'Search', href: '/search'}
        ]
    }

	vm.isMyProfile = function () {
		return $rootScope.ownerId == $rootScope.userId;
	};
	vm.changeHash = function(data) {
		if (vm.initialized){
			//$rootScope.userId = $rootScope.ownerId;
			$location.path(data);
		} else {
			vm.initialized = true;
			for(var i = 0; i < vm.tabs.length; i++){
				if(vm.tabs[i].href == $location.path())
					vm.tabs[i].active = true;
			}
		}
	};
	vm.deactivateUserProfileTab = function() {
		vm.tabs[0].active = false;
	};
});

module.exports = app;


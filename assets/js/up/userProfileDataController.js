var app = require('../angular-app');

app.controller('userProfileDataController', userProfileDataCtrl);

function userProfileDataCtrl(prefix, $scope, $location) {
    $scope.prefix = prefix;
    var vm = this;
    vm.goToMyProfile = function(){
		$location.path = '/profile/';
	};
    var prefix = window.location.pathname;
    vm.tabs = [
        { title:'User Profile', content: prefix + '/js/up/up-public.html' },
        { title:'User Experience', content:  prefix + '/js/cv/cv-public.html' },
        { title:'User PDP Flow', content: prefix + '/js/pdp/pdp-public.html' }
    ];
}
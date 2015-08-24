var app = require('../angular-app');

app.controller('userProfileDataController', ['$scope', 'UserProfileService', 'Upload', '$rootScope', userCtrl]);

function userCtrl($scope, $window, $location, $rootScope) {

    var vm = this;
    //vm.userDataTabs = [
    //    {title: 'My profile', href: '/userpage'},
    //    {title: 'My experience', href: '/userpage'},
    //    {title: 'PDP flow', href: '/userpage'}
    //];

    //vm.tabs = [
    //    { title:'Dynamic Title 1', content:'Dynamic content 1' },
    //    { title:'Dynamic Title 2', content:'Dynamic content 2' }
    //];

    vm.tabs = [
        {title: 'My profile', data: 'js/user-profile/user-profile.html'},
        {title: 'My experience', href: '/userpage'},
        {title: 'PDP flow', href: '/userpage'}
    ];


    vm.changeHash = function(data) {
        $location.path(data);
    };

}
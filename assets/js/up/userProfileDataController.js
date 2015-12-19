var app = require('../angular-app');

app.controller('userProfileDataController', userProfileDataCtrl);

function userProfileDataCtrl(prefix, $scope) {
    $scope.prefix = prefix;
    var vm = this;
    var prefix = window.location.pathname;
    vm.tabs = [
        { title:'User Profile', content: '/js/up/up-public.html' },
        { title:'User Experience', content:  '/js/cv/cv-public.html' },
        { title:'User PDP Flow', content: '/js/pdp/pdp-public.html' }
    ];
}
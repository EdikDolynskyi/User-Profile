var app = require('../angular-app');

app.controller('userProfileDataController', ['$scope', 'UserProfileService', 'Upload', '$rootScope', userCtrl]);

function userCtrl() {
    var vm = this;
    vm.tabs = [
        { title:'User Profile', content:'js/user-profile/user-profile-public.html' },
        { title:'User Experience', content:'js/cv/cv-public.html' },
        { title:'User PDP Flow', content:'js/pdp/pdp-public.html' }
    ];
}
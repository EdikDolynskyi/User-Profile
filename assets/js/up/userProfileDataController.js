var app = require('../angular-app');

app.controller('userProfileDataController', userCtrl);

function userCtrl() {
    var vm = this;
    vm.tabs = [
        { title:'User Profile', content:'js/up/up-public.html' },
        { title:'User Experience', content:'js/cv/cv-public.html' },
        { title:'User PDP Flow', content:'js/pdp/pdp-public.html' }
    ];
}
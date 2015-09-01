var app = require('../angular-app');

app.controller('UserProfilePublicController', ['UserProfilePublicService', '$rootScope', '$location',userCtrl]);

function userCtrl(service, $rootScope, $location) {
    var ctrl = this;
    //Init
    ctrl.today = new Date();

    var userId = $location.path().split("/")[2];
    $rootScope.userId = userId;
    service.get(userId, function (user) {
        ctrl.user = user;
        ctrl.userOriginal = angular.extend({}, user);
    });
}

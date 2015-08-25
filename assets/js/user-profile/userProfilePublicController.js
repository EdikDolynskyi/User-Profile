var app = require('../angular-app');

app.controller('UserProfilePublicController', ['$scope', 'UserProfileService', 'Upload', '$rootScope', userCtrl]);

function userCtrl($scope, service, upload, $rootScope) {
    var ctrl = this;
    //Init
    ctrl.today = new Date();


    service.get($rootScope.userId, function (user) {
        ctrl.user = user;
        ctrl.userOriginal = angular.extend({}, user);
    });
}

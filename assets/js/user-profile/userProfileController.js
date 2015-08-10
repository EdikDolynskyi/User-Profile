var app = require('../angular-app');

app.controller('UserProfileController', ['$scope', 'UserProfileService', userCtrl]);

function userCtrl($scope, service) {
    var ctrl = this;
    //Init
    ctrl.today = new Date();

    service.get('55c38b5a956240ba4c6a5f24', function(user) {
        user.avatar.urlAva = 'images/Unknown.png';
        ctrl.user = user;
        ctrl.userOriginal = angular.extend({}, user);
    });

    this.doUpdate = function () {
        service.update(ctrl.user, function (user) {
            angular.copy(user, ctrl.userOriginal);
           alert('User Updated');
        });
    };
    this.cancelUpdate = function() {
        angular.copy(ctrl.userOriginal, ctrl.user);
    };
}

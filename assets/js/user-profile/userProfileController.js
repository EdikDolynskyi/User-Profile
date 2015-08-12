var app = require('../angular-app');

app.controller('UserProfileController', ['$scope', 'UserProfileService', 'Upload', userCtrl]);

function userCtrl($scope, service, upload) {
    var ctrl = this;
    //Init
    ctrl.today = new Date();

    service.get('55c38b5a956240ba4c6a5f24', function (user) {
        ctrl.user = user;
        ctrl.userOriginal = angular.extend({}, user);
    });

    this.doUpdate = function () {
        service.update(ctrl.user, function (user) {
            angular.copy(user, ctrl.userOriginal);
            alert('User Updated');
        });
    };
    this.cancelUpdate = function () {
        angular.copy(ctrl.userOriginal, ctrl.user);
    };

    this.upload = function (file) {
        if (file) {
            upload.upload({
                url: '/api/files/upload',
                file: file
            }).success(function (data) {
                ctrl.user.avatar.urlAva = service.getAvatarUrl(data.file);
            }).error(function (data, status) {
                console.log('error status: ' + status);
            })
        }
    };
}

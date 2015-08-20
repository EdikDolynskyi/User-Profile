var app = require('../angular-app');

app.controller('UserProfileAdminController', ['$scope', 'UserProfileAdminService', 'Upload', userCtrl]);

function userCtrl($scope, service, upload) {
    var ctrl = this;
    //Init
    ctrl.today = new Date();

    service.get('55c38b5a956240ba4c6a5f24', function (user) {
        ctrl.user = user;
        // ctrl.user.preModeration = user.preModeration;
    });



    this.doUpdate = function () {
        angular.extend(ctrl.user, ctrl.user.preModeration);
        ctrl.user.changeAccept = true;
        //ctrl.checkChange(ctrl.user.changeAccept);
        service.update(ctrl.user, function (user) {
            angular.extend(ctrl.user, ctrl.user.preModeration);
            ctrl.user.preModeration = {};
        });
    };
    this.cancelUpdate = function () {
        ctrl.user.preModeration = {};
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

var app = require('../angular-app');

app.controller('UserProfileAdminController', ['$scope', 'UserProfileAdminService', 'Upload', '$rootScope', userCtrl]);

function userCtrl($scope, service, upload, $rootScope) {
    var ctrl = this;
    //Init
    ctrl.today = new Date();
    ctrl.showElement = {};

    service.get($rootScope.userId, function (user) {
        ctrl.user = user;
        ctrl.originPreModeration = angular.copy(user.preModeration);
        ctrl.showChangesFields(user.preModeration);
    });


    this.doUpdate = function () {

        for(var key in ctrl.user.preModeration){
            ctrl.user[key] = ctrl.user.preModeration[key];
            ctrl.showElement[key] = false;
        }
        ctrl.user.preModeration = {};
        ctrl.user.changeAccept = true;

        service.update(ctrl.user, function (user) {
            alert('User Updated');
        });
    };

    this.cancelUpdate = function () {
        ctrl.user.preModeration = angular.copy(ctrl.originPreModeration);
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
    this.showChangesFields = function(changes){
        for(var key in changes){
            ctrl.showElement[key] = true;
        }
    }
}

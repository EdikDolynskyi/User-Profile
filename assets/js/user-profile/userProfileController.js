var app = require('../angular-app');

app.controller('UserProfileController', ['$scope', 'UserProfileService', 'Upload', '$rootScope', userCtrl]);

function userCtrl($scope, service, upload, $rootScope) {
    var ctrl = this;
    //Init
    ctrl.today = new Date();

    service.get($rootScope.ownerId, function (user) {

        delete user.$promise;
        delete user.$resolved;

        if(!user.changeAccept){
            ctrl.user = user.preModeration;
        }
        else {
            ctrl.userOriginal = angular.extend({}, user);
            ctrl.user = angular.copy(ctrl.userOriginal);
        }

        ctrl.checkChange(user.changeAccept);
    });

    this.checkChange = function (changeAccept){
        if (changeAccept){
            ctrl.changeMessage = "User Profile Data moderate";
            ctrl.messageStyle = {
                "color" : "#3c763d",
                "background-color": "#dff0d8",
                "border-color": "#d6e9c6"
            };
        }

        else {
            ctrl.changeMessage = "User Profile Data not yet moderate";
            ctrl.messageStyle = {
                "color" : "#a94442",
                "background-color": "#f2dede",
                "border-color": "#ebccd1"
            };
        }
    };

    this.doUpdate = function () {
        ctrl.userOriginal.preModeration = angular.copy(ctrl.user);
        ctrl.userOriginal.preModeration.preModeration = {};
        //angular.copy(ctrl.userOriginal, ctrl.user);
        ctrl.user.changeAccept = false;
        ctrl.checkChange(ctrl.user.changeAccept);

        service.update(ctrl.userOriginal, function (user) {
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

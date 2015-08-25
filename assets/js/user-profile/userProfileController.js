var app = require('../angular-app');

app.controller('UserProfileController', ['$scope', 'UserProfileService', 'Upload', '$rootScope', userCtrl]);

function userCtrl($scope, service, upload, $rootScope) {
    var ctrl = this;
    //Init
    ctrl.today = new Date();
    ctrl.oldUserData = {};
    ctrl.newUserData = {};
    ctrl.dataInFields = {}; //here fields, wich changed

    service.get($rootScope.ownerId, function (user) {

        delete user.$promise;
        delete user.$resolved;

        if (!user.changeAccept) {

            ctrl.user = angular.copy(user);
            for (var key in user.preModeration) {
                ctrl.user[key] = angular.copy(user.preModeration[key]);
            }
        }
        else {
            ctrl.userOriginal = angular.extend({}, user);
            ctrl.user = angular.copy(ctrl.userOriginal);
        }

        ctrl.checkChange(user.changeAccept);
    });

    this.checkChange = function (changeAccept) {
        if (changeAccept) {
            ctrl.changeMessage = "User Profile Data moderate";
            ctrl.messageStyle = {
                "color": "#3c763d",
                "background-color": "#dff0d8",
                "border-color": "#d6e9c6"
            };
        }

        else {
            ctrl.changeMessage = "User Profile Data not yet moderate";
            ctrl.messageStyle = {
                "color": "#a94442",
                "background-color": "#f2dede",
                "border-color": "#ebccd1"
            };
        }
    };

    this.doUpdate = function () {
        ctrl.userOriginal.preModeration = ctrl.newUserData;


        ctrl.getChangesFields(ctrl.userOriginal, ctrl.user);

        var data = {
            "owner": {"name": ctrl.userOriginal.name},
            "original": ctrl.oldUserData,
            "changes": ctrl.newUserData,
            "date": {"date": ctrl.today}
        };


        if (Object.keys(ctrl.newUserData).length !== 0) {
            ctrl.addUserChangeLog(data);
            ctrl.userOriginal.changeAccept = false;
            service.update(ctrl.userOriginal, function (user) {

                ctrl.checkChange(ctrl.userOriginal.changeAccept);
                alert('Your changes send to moderate. Changes will be made when the administrator becomes sober.');
            });
        }
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
                ctrl.dataInFields.avatar = angular.copy(ctrl.user.avatar);
                console.log(ctrl.dataInFields);
            }).error(function (data, status) {
                console.log('error status: ' + status);
            })
        }
    };


    this.addUserChangeLog = function (data) {
        service.addLog(ctrl.userOriginal.id, data, function (data) {
            alert('user data added to logs!');
        });
    };

    this.getChangesFields = function (original, edited) {
        for (var key in ctrl.dataInFields) {
            if (original[key] !== edited[key]) {
                ctrl.oldUserData[key] = angular.copy(original[key]);
                ctrl.newUserData[key] = angular.copy(edited[key]);
            }

        }
    };

    this.change = function (prop, propValue) {
        ctrl.dataInFields[prop] = propValue;
    }
}

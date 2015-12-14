var app = require('../angular-app');

app.controller('UserProfileAdminController', ['$scope', 'UserProfileAdminService', 'Upload', '$rootScope', userCtrl]);

function userCtrl($scope, service, upload, $rootScope) {
    var ctrl = this;
    //Init
    ctrl.today = new Date();
    ctrl.showElement = {};
    ctrl.userLog = {};
    ctrl.userLogList = [];
    ctrl.oldUserData = {};
    ctrl.newUserData = {};

    service.get($rootScope.userId, function (user) {
        ctrl.user = user;
        ctrl.originPreModeration = angular.copy(user.preModeration);
        ctrl.showChangesFields(user.preModeration);
    });


    this.doUpdate = function () {

        for (var key in ctrl.user.preModeration) {

            ctrl.oldUserData[key] = angular.copy(ctrl.user[key]);
            ctrl.newUserData[key] = angular.copy(ctrl.user.preModeration[key]);

            ctrl.user[key] = angular.copy(ctrl.user.preModeration[key]);
            ctrl.showElement[key] = false;

        }
        ctrl.user.preModeration = {};
        ctrl.user.changeAccept = true;

        var data = {
            "owner": {"name": "Admin"}, //Must be admin name
            "original": ctrl.oldUserData,
            "changes": ctrl.newUserData,
            "date": {"date": ctrl.today}
        };

        ctrl.addUserChangeLog(data);

        service.update(ctrl.user, function (user) {
            alert('User Updated');
            ctrl.getUserLog();
        });
    };

    this.cancelUpdate = function () {
        ctrl.user.preModeration = angular.copy(ctrl.originPreModeration);
    };

    this.upload = function (file) {
        if (file) {
            upload.upload({
                url: 'api/files/upload',
                file: file
            }).success(function (data) {
                ctrl.user.preModeration.avatar.urlAva = service.getAvatarUrl(data.file);
            }).error(function (data, status) {
                console.log('error status: ' + status);
            })
        }
    };

    this.showChangesFields = function (changes) {
        for (var key in changes) {
            ctrl.showElement[key] = true;
        }
    };

    this.showLogs = function () {
        ctrl.getUserLog();
        ctrl.showElement.logs = !ctrl.showElement.logs;
        ctrl.userLog = {};
        ctrl.userLogList = [];
    };

    this.getUserLog = function () {

        service.getUserLog(ctrl.user.id, function (userLog) {

            delete userLog.$promise;
            delete userLog.$resolved;

            ctrl.userLog = angular.copy(userLog[0]);
            ctrl.makeLogList(ctrl.userLog);
        });
    };


    this.makeLogList = function (userLog) {
        var original = userLog.original;
        var changes = userLog.changes;
        var owner = userLog.owner;
        var date = userLog.date;

        for (var i = 0; i < changes.length; i++) {
            var message = 'User ' + owner[i].name + ' do next changes:' + '\n';
            for (var key in changes[i]) {
                message = message +
                    'Field ' + key + ' ' + original[i][key] +
                    ' changed to ' + changes[i][key] + '\n';
            }
            message = message + date[i].date;
            ctrl.userLogList.push(message);
        }
    }

    this.addUserChangeLog = function (data) {
        service.addLog(ctrl.user.id, data, function (data) {
        });
    };
}

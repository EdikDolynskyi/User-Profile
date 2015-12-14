var app = require('../angular-app');

app.controller('UserProfileController', ['$scope', 'UserProfileService', 'uploadService', 'downloadService', '$rootScope', userCtrl]);

function userCtrl($scope, UserProfileService, uploadService, downloadService, $rootScope) {
    var vm = this;
    //Init
    vm.today = new Date();
    vm.oldUserData = {};
    vm.newUserData = {};
    vm.dataInFields = {}; //here fields, wich changed

    vm.changeMessage = 'User Profile Data is waiting for moderation';

    var prefix = window.location.pathname;


    UserProfileService.get($rootScope.ownerId, function (user) {

        delete user.$promise;
        delete user.$resolved;

        if (!user.changeAccept) {

            vm.user = angular.copy(user);
            for (var key in user.preModeration) {
                vm.user[key] = angular.copy(user.preModeration[key]);
            }
        }
        else {
            vm.userOriginal = angular.extend({}, user);
            vm.user = angular.copy(vm.userOriginal);
        }
    });


    $scope.$watch(angular.bind(vm, function () {
        return vm.url;
    }), function (url) {
        if (url) {
            vm.user.avatar.urlAva = url;
        }
    });

    vm.doUpdate = function () {

        if (vm.url) {
            var obj = {};
            obj.url = vm.url;
            var pathArray = obj.url.split('/');
            var fileName = pathArray[pathArray.length - 1];
            obj.fileName = './upload/' + fileName;

            downloadService.downloadFile(obj, function () {
                vm.user.avatar.urlAva = 'api/files/get/' + fileName;
                vm.dataInFields.avatar = angular.copy(vm.user.avatar);

                vm.getChangesFields(vm.userOriginal, vm.user);
                vm.userOriginal.preModeration = vm.newUserData;

                var data = {
                    "owner": {"name": vm.userOriginal.name},
                    "original": vm.oldUserData,
                    "changes": vm.newUserData,
                    "date": {"date": vm.today}
                };

                if (Object.keys(vm.newUserData).length !== 0) {
                    vm.userOriginal.changeAccept = false;
                    UserProfileService.update(vm.userOriginal, function (user) {
                        alert('Your changes send to moderate. Changes will be made when the administrator becomes sober.');
                        vm.addUserChangeLog(data);
                        vm.user.changeAccept = false;
                    });
                }
                vm.showUrlInput = false;
                vm.url = "";
            });
        }

        else {
            vm.getChangesFields(vm.userOriginal, vm.user);
            vm.userOriginal.preModeration = vm.newUserData;

            var data = {
                "owner": {"name": vm.userOriginal.name},
                "original": vm.oldUserData,
                "changes": vm.newUserData,
                "date": {"date": vm.today}
            };

            if (Object.keys(vm.newUserData).length !== 0) {
                vm.addUserChangeLog(data);
                vm.userOriginal.changeAccept = false;
                UserProfileService.update(vm.userOriginal, function (user) {
                    alert('Your changes send to moderate. Changes will be made when the administrator becomes sober.');
                    vm.user.changeAccept = false;
                });
            }
        }
    };

    vm.cancelUpdate = function () {
        angular.copy(vm.userOriginal, vm.user);
    };


    vm.upload = function (file) {
        uploadService.upload(file, function (fileSrc) {
            vm.user.avatar.urlAva = prefix + fileSrc;
            vm.dataInFields.avatar = angular.copy(vm.user.avatar);
        });
    };

    vm.addUserChangeLog = function (data) {
        UserProfileService.addLog(vm.userOriginal.id, data, function (data) {
        });
    };

    vm.getChangesFields = function (original, edited) {
        for (var key in vm.dataInFields) {
            if (original[key] !== edited[key]) {
                vm.oldUserData[key] = angular.copy(original[key]);
                vm.newUserData[key] = angular.copy(edited[key]);
            }
        }
    };

    vm.change = function (prop, propValue) {
        vm.dataInFields[prop] = propValue;
    };
}

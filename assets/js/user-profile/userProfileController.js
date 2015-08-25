var app = require('../angular-app');

app.controller('UserProfileController', ['$scope', 'UserProfileService', 'uploadService', 'downloadService', userCtrl]);

function userCtrl($scope, UserProfileService, uploadService, downloadService) {
    var vm = this;
    vm.today = new Date();
    vm.showUrlInput = false;

    getUser();

    function getUser() {
        UserProfileService.get(function(user) {
            vm.user = user;
            vm.userOriginal = angular.extend({}, user);
        });
    }

    $scope.$watch(angular.bind(this, function() {
        return this.url;
    }), function(url) {
        if(url) {
            vm.user.avatar.urlAva = url;
        }
    });

    vm.doUpdate = function () {
        if(vm.url){
            var obj = {};
            obj.url = vm.user.avatar.urlAva;
            var pathArray = obj.url.split( '/' );
            var fileName = pathArray[pathArray.length-1];
            obj.fileName = './upload/' + fileName;

            downloadService.downloadFile(obj);
            vm.user.avatar.urlAva = '/api/files/get/' + fileName;
        }

        UserProfileService.update(vm.user, function (user) {
            angular.copy(user, vm.userOriginal);
            vm.user.avatar.urlAva = user.avatar.urlAva;
            alert('User Updated');
        });

        vm.showUrlInput = false;
        vm.url = "";
    };

    vm.cancelUpdate = function () {
        angular.copy(vm.userOriginal, vm.user);
    };

    vm.upload = function(file) {
        uploadService.upload(file, function(fileSrc){
            vm.user.avatar.urlAva = fileSrc;
        });
    };

}

var app = require('../angular-app');

app.controller('UserProfileController', ['$scope', 'UserProfileService', 'uploadService', 'downloadService', '$rootScope', 'PdpService', 'prefix', userProfileCtrl]);

function userProfileCtrl($scope, UserProfileService, uploadService, downloadService, $rootScope, PdpService, prefix) {
	$scope.prefix = prefix;
	var vm = this;
	//Init
	vm.today = new Date();
	vm.dataInFields = {}; //here fields, wich changed
	vm.formValid = true;
	vm.addPhotoByUrl = false;
	vm.url = '';

	UserProfileService.get($rootScope.ownerId, function (user) {

		delete user.$promise;
		delete user.$resolved;

		vm.userOriginal = angular.extend({}, user);
		vm.user = angular.copy(vm.userOriginal);
        PdpService.getPDPByID(vm.user.userPDP.id, function(pdp){
            vm.user.userPDP = pdp;
        });
	});

	$scope.$watch(angular.bind(vm, function () {
		return vm.url;
	}), function (url) {
		if (url) {
			vm.user.avatar.urlAva = url;
		}
	});

	vm.doUpdate = function () {
		vm.validForm = UserProfileService.validateForm($scope.MainProfile);
		if (vm.validForm){
			var changeFields;
			if (vm.url) {
				var obj = {};
				obj.url = vm.url;
				var pathArray = obj.url.split('/');
				var fileName = pathArray[pathArray.length - 1];
				obj.fileName = './upload/' + fileName;

				downloadService.downloadFile(obj, function () {
					vm.user.avatar.urlAva = '/api/files/get/' + fileName;
					vm.dataInFields.avatar = angular.copy(vm.user.avatar);
					vm.sendData();
					vm.showUrlInput = false;
					vm.url = "";
				});
			} else {
				vm.sendData();
			}
		}
	};

	vm.sendData = function(){
		changeFields = vm.getChangesFields(vm.user.preModeration, vm.userOriginal, vm.user, vm.dataInFields);
		var data = {
			"owner": {"name": vm.userOriginal.name},
			"original": changeFields.oldUserData,
			"changes": changeFields.changes,
			"date": {"date": vm.today}
		};

		if (changeFields.isChanged) {
				vm.user.preModeration = changeFields.changes;
				vm.user.changeAccept = false;

			UserProfileService.update(vm.user, function (user) {
				vm.addUserChangeLog(data);
				changeFields.isChanged = false;
				vm.userOriginal = angular.copy(vm.user);
				alert('The changes have been saved');
			});
		}
	};

	vm.cancelUpdate = function () {
		angular.copy(vm.userOriginal, vm.user);
	};


	vm.upload = function (file) {
		vm.url = "";
		uploadService.upload(file, function (fileSrc) {
			vm.user.avatar.urlAva = fileSrc;
			vm.dataInFields.avatar = angular.copy(vm.user.avatar);
		});
	};

	vm.addUserChangeLog = function (data) {
		UserProfileService.addLog(vm.userOriginal.id, data, function (data) {
		});
	};

	vm.getChangesFields = function (preModeration, original, edited, dataInFields) {
	   return UserProfileService.getChangesFields(preModeration, original, edited, dataInFields);
	};

	vm.change = function (prop, propValue) {
		vm.dataInFields[prop] = propValue;
	};
}

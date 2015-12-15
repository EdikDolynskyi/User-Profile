var app = require('../angular-app');

app.controller('UserProfileController', ['$scope', 'UserProfileService', 'uploadService', 'downloadService', '$rootScope', userCtrl]);

function userCtrl($scope, UserProfileService, uploadService, downloadService, $rootScope) {
	var vm = this;
	//Init
	vm.today = new Date();
	vm.oldUserData = {};
	vm.newUserData = {};
	vm.dataInFields = {}; //here fields, wich changed

	var prefix = window.location.pathname;


	UserProfileService.get($rootScope.ownerId, function (user) {

		delete user.$promise;
		delete user.$resolved;

		vm.userOriginal = angular.extend({}, user);
		vm.user = angular.copy(vm.userOriginal);
	});

	$scope.$watch(angular.bind(vm, function () {
		return vm.url;
	}), function (url) {
		if (url) {
			vm.user.avatar.urlAva = url;
		}
	});

	vm.doUpdate = function () {
		var changeFields;
		if (vm.url) {
			var obj = {};
			obj.url = vm.url;
			var pathArray = obj.url.split('/');
			var fileName = pathArray[pathArray.length - 1];
			obj.fileName = './upload/' + fileName;

			downloadService.downloadFile(obj, function () {
				vm.user.avatar.urlAva = 'api/files/get/' + fileName;
				vm.dataInFields.avatar = angular.copy(vm.user.avatar);

				var data = {
					"owner": {"name": vm.userOriginal.name},
					"original": vm.oldUserData,
					"changes": vm.newUserData,
					"date": {"date": vm.today}
				};

				changeFields = vm.getChangesFields(vm.user.preModeration, vm.userOriginal, vm.user, vm.dataInFields);

				if (changeFields.isChanged) {
						vm.user.preModeration = changeFields.changes;
						vm.user.changeAccept = false;

					UserProfileService.update(vm.user, function (user) {
						vm.addUserChangeLog(data);
						console.log('The changes have been saved');
						alert('The changes have been saved');
					});
				}
				vm.showUrlInput = false;
				vm.url = "";
			});
		}

		else {

			var data = {
				"owner": {"name": vm.userOriginal.name},
				"original": vm.oldUserData,
				"changes": vm.newUserData,
				"date": {"date": vm.today}
			};

			changeFields = vm.getChangesFields(vm.user.preModeration, vm.userOriginal, vm.user, vm.dataInFields);

			if (changeFields.isChanged) {
					vm.user.preModeration = changeFields.changes;
					vm.user.changeAccept = false;

				UserProfileService.update(vm.user, function (user) {
					vm.addUserChangeLog(data);
					console.log('The changes have been saved');
					alert('The changes have been saved');
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

	vm.getChangesFields = function (preModeration, original, edited, dataInFields) {
	   return UserProfileService.getChangesFields(preModeration, original, edited, dataInFields);
	};

	vm.change = function (prop, propValue) {
		vm.dataInFields[prop] = propValue;
	};
}

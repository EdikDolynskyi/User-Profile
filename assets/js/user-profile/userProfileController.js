var app = require('../angular-app');

app.controller('UserProfileController', ['$scope', 'UserProfileService', userCtrl]);

function userCtrl($scope, UserProfileService) {

    UserProfileService.resUser().get(function( user ) {
        $scope.user = user;
    });

    $scope.updateUserData = function (argument) {
    	// body...
    };

    $scope.uploadFile = function($event) {
	 	// $('input[type=file]').bootstrapFileInput();
		// $('.file-inputs').bootstrapFileInput();
	};

	$scope.openDatepicker = function($event) {
		$scope.opened = true;
	};
}
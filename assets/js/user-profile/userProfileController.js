var app = require('../angular-app');

app.controller('UserProfileController', ['$scope', 'UserProfileService', userCtrl]);

function userCtrl($scope, UserProfileService) {

    UserProfileService.resUser().query(function( user ) {
        $scope.user = user;
    });


	$scope.openDatepicker = function($event) {
		$scope.opened = true;
	};

}

var app = require('../angular-app');

app.controller('UserProfileController', ['$scope', 'UserProfileService', userCtrl]);

function userCtrl($scope, UserProfileService) {
    resourceGetDataService.resUser().query(function( user ) {
        $scope.user = user;
    });
}

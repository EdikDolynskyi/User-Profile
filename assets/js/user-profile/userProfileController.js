var app = require('../angular-app');

app.controller('UserProfileController', ['$scope', 'UserProfileService', userCtrl]);

function userCtrl($scope, UserProfileService) {
    UserProfileService.getUserData().get(function( user ) {
        $scope.user = user;
        user.avatar.urlAva = "images/Unknown.png";
    });
}

angular
    .module('myApp')
    .controller('userCtrl', ['$scope', 'resourceGetDataService', userCtrl]);


function userCtrl($scope, resourceGetDataService) {
    resourceGetDataService.resUser().query(function( user ) {
        $scope.user = user;
    });
}

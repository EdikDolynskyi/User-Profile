angular.module('myApp')
    .service('resourceGetDataService', resourceGetDataService)
    .controller('userCtrl', ['$scope', 'resourceGetDataService', userCtrl]);


function userCtrl(resourceGetDataService) {
    $scope.hello = resourceGetDataService.resUser();
    //$scope.hello = "Hello Edik!";
}
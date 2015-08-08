require("../angular-app");
angular
    .module('myApp', ['ngResource'])
    .service('resourceGetDataService', resourceGetDataService);

function resourceGetDataService($resource) {
    this.resUser = function() {
        return $resource('http://localhost:1337/api/users/55c38b5a956240ba4c6a5f24');
    };
}

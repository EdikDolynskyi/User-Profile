angular.module('myApp').service('resourceGetDataService', function($resource){
    this.resList = function() {
        return $resource('http://localhost:1337/api/technologies');
    };
});
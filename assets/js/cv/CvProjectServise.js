angular.module('myApp').service('ProjectServ', function($resource){


	var userId = '55c38b5a956240ba4c6a5f24';
	var cv = $resource('api/cvs/'+userId);

	var user =cv.get();
		user.$promise.then(function (resultUser) {
        user = resultUser;
        console.log(resultUser);
    });
return  user;
});
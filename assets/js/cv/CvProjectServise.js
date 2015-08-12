angular.module('myApp').factory('cvServise', function($resource){


	var userId = '55c38b5a956240ba4c6a5f24';
	var cv = $resource('api/cvs/'+userId);
	
	
	
	var getUserData =function(callback){ cv.get().$promise.then(function (resultUser) {
       		   
       		 callback(resultUser);
    	});

	};
	return {
		getUserData:getUserData
	};
});
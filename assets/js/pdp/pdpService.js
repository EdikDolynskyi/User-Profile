(function () {
    var app = angular.module('myApp');

    app.factory('PdpService', function($resource){
    	var service = {
    		getPDP:getPDP
    	};
    	return service;

    	function getPDP(callback){
    		var userPDP = {};
    		userPDP.userAch = [];
			userPDP.technologies = [];
			userPDP.certifications = [];
			userPDP.tests = [];


	    	var Pdps = $resource('/api/pdps/:id', {id: '@id'});
	        var pdp = Pdps.get({id: '55c3906d7533125308baafa2'}, function(resPDP){
	            
	           	userPDP.userTasks = resPDP.tasks;

	            var Positions = $resource('/api/positions/:id', {id: '@id'});
	            var position = Positions.get({id: resPDP.position}, function(data){
	                userPDP.position = data.name;
	            }, function(err){
	                console.log(err);
	            });
	            
	            var DevDirection = $resource('/api/directions/:id', {id: '@id'});
	            var direction = DevDirection.get({id: resPDP.direction}, function(data){
	                userPDP.position = userPDP.position + " " + data.name;

	            }, function(err){
	                console.log(err);
	            });

	            var Achievements = $resource('/api/achievements/:id', {id: '@id'});
	            for(var i = 0; i < resPDP.achievements.length; i++){
	            	var achievement = Achievements.get({id: resPDP.achievements[i].ach}, function(data){
	                	userPDP.userAch.push({name: data.name, img: 'http://placehold.it/140x100'/*data.image*/});
	            	}, function(err){
	                	console.log(err);
	            	});
	            }

				var Technologies = $resource("/api/technologies/:id", {id: '@id'});
				for(var i = 0; i < resPDP.technologies.length; i++){
					var technology = Technologies.get({id: resPDP.technologies[i].name},function(data){
						userPDP.technologies.push({name: data.name});
					}, function(err){
						console.log(err);
					});
				}

				var Certifications = $resource("/api/certifications/:id", {id: '@id'});
				for(var i = 0; i < resPDP.certificates.length; i++){
					var certification = Certifications.get({id: resPDP.certificates[i].name},function(data){
						userPDP.certifications.push({name: data.name});
					}, function(err){
						console.log(err);
					});
				}

				var Tests = $resource("/api/tests/:id", {id: '@id'});
				for(var i = 0; i < resPDP.tests.length; i++){
					var test = Tests.get({id: resPDP.tests[i].name},function(data){
						userPDP.tests.push({name: data.name});

						callback(userPDP);
					}, function(err){
						console.log(err);
					});
				}

			}, function(err){
	            console.log(err);
	        });
	    }

    });

})();
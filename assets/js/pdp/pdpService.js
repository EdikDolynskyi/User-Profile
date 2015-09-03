(function () {
    var app = angular.module('myApp');

    app.factory('PdpService', function($resource){

		var prefix = window.location.pathname;

    	var service = {
    		getPDP:getPDP,
    		updateTechnologies:updateTechnologies,
    		updateCertifications:updateCertifications,
    		updateTasks: updateTasks,
    		updateTests: updateTests,
    		getPositions:getPositions,
    		getDirections: getDirections,
    		getTechnologies:getTechnologies,
    		getCertifications:getCertifications,
    		getTests:getTests,
    		addTechnology: addTechnology,
    		removeTechnology: removeTechnology,
    		addCertification: addCertification,
    		removeCertification: removeCertification,
    		addTest: addTest,
    		removeTest: removeTest,
    		updatePosition: updatePosition,
    		updateDirection: updateDirection,
    		addTask:addTask,
    		removeTask:removeTask,
    		addAchievement: addAchievement,
    		removeAchievement: removeAchievement,
    		getAchievements: getAchievements,
    		addCompletedCertification: addCompletedCertification,
    		removeCompletedCertification: removeCompletedCertification
    	};
    	return service;

		function getPDP(userId, callback) {



			$resource(prefix + 'api/users/:id', {id: userId}).get(function (user) {
				var userPDP = {};
				$resource(prefix + 'getpdp/:id', {id: user.userPDP.id}).get(function (resPDP) {
					userPDP = resPDP;
					console.log(resPDP);
					callback(userPDP);

				}, function (err) {
					console.log(err);
				});
			});
		}

	    function getAchievements(callback){
	        var Achievements = $resource(prefix + 'api/achievements');
	        var achs = Achievements.query(function(res){
	                callback(res);
	            }, function(err){
	                console.log(err);
	            });
	    };

	    function getPositions(callback){
	    	var Positions = $resource(prefix + 'api/positions');
	    	var positions = Positions.query(function(res){
    			callback(res);
    		}, function(err){
	            console.log(err);
	        });
	    }

	    function getDirections(callback){
	    	var Directions = $resource(prefix + 'api/directions');
	    	var directions = Directions.query(function(res){
    			callback(res);
    		}, function(err){
	            console.log(err);
	        });
	    }

	   	function getTechnologies(callback){
	    	var Technologies = $resource(prefix + 'api/technologies');
	    	var technologies = Technologies.query(function(res){
    			callback(res);
    		}, function(err){
	            console.log(err);
	        });
	    }

	    function getCertifications(callback){
	    	var Certifications = $resource(prefix + 'api/certifications');
	    	var certifications = Certifications.query(function(res){
    			callback(res);
    		}, function(err){
	            console.log(err);
	        });
	    }

	    function getTests(callback){
	    	var Tests = $resource(prefix + 'api/tests');
	    	var tests = Tests.query(function(res){
    			callback(res);
    		}, function(err){
	            console.log(err);
	        });
	    }

	    function addCompletedCertification(obj, pdpId){
	    	var Pdps = $resource(prefix + 'addcompcert/:id', {id: '@id'}, {'update': { method:'PUT' }});
	    	var pdp = Pdps.update({id: pdpId}, obj)
	    }

	    function removeCompletedCertification(obj, pdpId){
	    	var Pdps = $resource(prefix + 'removecompcert/:id', {id: '@id'}, {'update': { method:'PUT' }});
	    	var pdp = Pdps.update({id: pdpId}, obj)
	    }

	    function addAchievement(obj, pdpId){
	    	var Pdps = $resource(prefix + 'addach/:id', {id: '@id'}, {'update': { method:'PUT' }});
	    	var pdp = Pdps.update({id: pdpId}, obj)
	    }

	   	function removeAchievement(obj, pdpId){
	    	var Pdps = $resource(prefix + 'removeach/:id', {id: '@id'}, {'update': { method:'PUT' }});
	    	var pdp = Pdps.update({id: pdpId}, obj)
	    }

	    function addTask(obj, pdpId){
	    	var Pdps = $resource(prefix + 'addtask/:id', {id: '@id'}, {'update': { method:'PUT' }});
	    	var pdp = Pdps.update({id: pdpId}, obj);
	    }

	    function removeTask(obj, pdpId){
	    	var Pdps = $resource(prefix + 'removetask/:id', {id: '@id'}, {'update': { method:'PUT' }});
	    	var pdp = Pdps.update({id: pdpId}, obj)
	    }

	    function addTechnology(obj, pdpId){
	    	var Pdps = $resource(prefix + 'addtech/:id', {id: '@id'}, {'update': { method:'PUT' }});
	    	var pdp = Pdps.update({id: pdpId}, obj);
	    }

	    function removeTechnology(obj, pdpId){
	    	var Pdps = $resource(prefix + 'removetech/:id', {id: '@id'}, {'update': { method:'PUT' }});
	    	var pdp = Pdps.update({id: pdpId}, obj)
	    }

	    function addCertification(obj, pdpId){
	    	var Pdps = $resource(prefix + 'addcert/:id', {id: '@id'}, {'update': { method:'PUT' }});
	    	var pdp = Pdps.update({id: pdpId}, obj);
	    }

	    function removeCertification(obj, pdpId){
	    	var Pdps = $resource(prefix + 'removecert/:id', {id: '@id'}, {'update': { method:'PUT' }});
	    	var pdp = Pdps.update({id: pdpId}, obj)
	    }

	    function addTest(obj, pdpId){
	    	var Pdps = $resource(prefix + 'addtest/:id', {id: '@id'}, {'update': { method:'PUT' }});
	    	var pdp = Pdps.update({id: pdpId}, obj);
	    }

	    function removeTest(obj, pdpId){
	    	var Pdps = $resource(prefix + 'removetest/:id', {id: '@id'}, {'update': { method:'PUT' }});
	    	var pdp = Pdps.update({id: pdpId}, obj)
	    }

	    function updatePosition(obj, pdpId){
	    	var Pdps = $resource(prefix + 'updatepos/:id', {id: '@id'}, {'update': { method:'PUT' }});
	    	var pdp = Pdps.update({id: pdpId}, obj);
	    }

	    function updateDirection(obj, pdpId){
	    	var Pdps = $resource(prefix + 'updatedir/:id', {id: '@id'}, {'update': { method:'PUT' }});
	    	var pdp = Pdps.update({id: pdpId}, obj);
	    }

	    function updateTechnologies(obj, pdpId){
	    	var Pdps = $resource(prefix + 'updatetech/:id', {id: '@id'}, {'update': { method:'PUT' }});
	    	var pdp = Pdps.update({id: pdpId}, obj);
	    }

	    function updateCertifications(obj, pdpId){
	    	var Pdps = $resource(prefix + 'updatecert/:id', {id: '@id'}, {'update': { method:'PUT' }});
	    	var pdp = Pdps.update({id: pdpId}, obj);
	    }

	    function updateTasks(obj, pdpId){
	    	var Pdps = $resource(prefix + 'updatetask/:id', {id: '@id'}, {'update': { method:'PUT' }});
	    	var pdp = Pdps.update({id: pdpId}, obj);
	    }

	    function updateTests(obj, pdpId){
	    	var Pdps = $resource(prefix + 'updatetest/:id', {id: '@id'}, {'update': { method:'PUT' }});
	    	var pdp = Pdps.update({id: pdpId}, obj);
	    }
    });

})();
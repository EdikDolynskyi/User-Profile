(function () {
    var app = angular.module('myApp');

    app.factory('PdpService', function($resource){
    	var service = {
    		getPDP:getPDP
    	}
    	return service;
    	function getPDP(callback){
    		var userPDP = {};
    		userPDP.userAch = [];
	    	var Pdps = $resource('http://localhost:1337/api/pdps/:id', {id: '@id'});
	        var pdp = Pdps.get({id: '55c4899b996812d416104929'}, function(resPDP){
	            
	           	userPDP.userTasks = resPDP.userTasks;

	            var Positions = $resource('http://localhost:1337/api/positions/:id', {id: '@id'});
	            var pos = Positions.get({id: resPDP.userPosition}, function(resPos){
	                userPDP.position = resPos.positionName;
	            }, function(err){
	                console.log(err);
	            });
	            
	            var DevDirection = $resource('http://localhost:1337/api/directions/:id', {id: '@id'});
	            var dir = DevDirection.get({id: resPDP.userDevDirection}, function(resDir){
	                userPDP.position = userPDP.position + " " + resDir.devDirectName;
					callback(userPDP);
	            }, function(err){
	                console.log(err);
	            });

	            //var Achievements = $resource('http://localhost:1337/api/achievements/:id', {id: '@id'});
	            //for(var i = 0; i < resPDP.userAch.length; i++){
	            //	var ach = Achievements.get({id: resPDP.userAch[i].idAch}, function(resAch){
	            //    	//userPDP.userAch.push({achName: resAch.achName}, achImage: resAch.achImage);
	            //    	// callback(userPDP);
	            //	}, function(err){
	            //    	console.log(err);
	            //	});
	            //}


	        }, function(err){
	            console.log(err);
	        });
	    }
        
    });

})();
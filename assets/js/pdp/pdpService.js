(function () {
    var app = angular.module('myApp');

    app.factory('PdpService', function($resource){
    	var service = {
    		getPDP:getPDP,
    		updateTechnologies:updateTechnologies,
    		updateCertifications:updateCertifications,
    		updateTasks: updateTasks,
    		updateTests: updateTests
    	};
    	return service;

    	function getPDP(callback){
    		var userPDP = {};
    		var Pdps = $resource('/getpdp/:id', {id: '@id'})
    		var pdp = Pdps.get({id: '55c3906d7533125308baafa2'}, function(resPDP){
    			userPDP = resPDP;    			
    			callback(userPDP);
    		}, function(err){
	            console.log(err);
	        });
	    }

	    function updateTechnologies(obj){
	    	var Pdps = $resource('/updatetech/:id', {id: '@id'}, {'update': { method:'PUT' }});
	    	var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj);
	    }

	    function updateCertifications(obj){
	    	var Pdps = $resource('/updatecert/:id', {id: '@id'}, {'update': { method:'PUT' }});
	    	var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj);
	    }

	    function updateTasks(obj){
	    	var Pdps = $resource('/updatetask/:id', {id: '@id'}, {'update': { method:'PUT' }});
	    	var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj);
	    }

	    function updateTests(obj){
	    	var Pdps = $resource('/updatetest/:id', {id: '@id'}, {'update': { method:'PUT' }});
	    	var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj);
	    }
    });

})();
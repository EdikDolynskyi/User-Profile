angular.module('myApp').service('ProjectServ', function($resource){
	var P ={};
	var Project = $resource('api/projects'),
		user = $resource('api/users'),
		CV = $resource('/api/cvs');
		technologiesMainList = $resource('/api/technologies').query();
	
		P.listOfUserProjects = [];
		P.projectTehnologies = [];
	

  P.user = user.get({id:"55c38b5a956240ba4c6a5f24"});
    P.user.$promise.then(function (resultUser) {
        P.user = resultUser;
        // Нашли обьект юзера
        P.userCV = CV.get({id:P.user.userCV});
        P.userCV.$promise.then(function (resultCV) {
            P.userCV = resultCV;
            

            angular.forEach(P.userCV.projects, function(element) {
                
                P.projects = Project.get({id:element});
                P.projects.$promise.then(function (resultProj) {
                	
                    P.listOfUserProjects.push(resultProj);
                    console.log(resultProj,"resultProj");
                }).then(function(proj){
                	console.log(proj, "proj");
                	angular.forEach(proj.technologies, function(projTechnologiesID){
                		angular.forEach(technologiesMainList, function(technology){
                			if(projTechnologiesID == technology.id){
                				P.projectTehnologies.push(technology);
                			}
                		});
                		
                	});
                });
            });

        });
    }).catch(function(err){console.log("123",err);});
 
    

return P;
});
angular.module('myApp').controller('technologiesCtrl', function($scope, technologies, ProjectServ) {
    $scope.listOfAllTechnologies = technologies.listOfAllTechnologies;
    $scope.listOfAllCategories = technologies.listOfAllCategories;
    
    $scope.technologies = technologies;

    $scope.submit = function(msg){
        technologies.serSubmit(msg);
        if (!technologies.technologyTypeShow) {
            $scope.technologiesEnterText = '';
        }
    };
    $scope.submitOne = function(msg){
        technologies.serSubmitOne(msg);
       		$scope.technologyTypeEnterText = '';
            $scope.technologiesEnterText = '';
      
    };
    $scope.rate = 1;
  	$scope.max = 5;
 	$scope.filtrRate=1;
    $scope.listOfUserTechnologies = technologies.listOfUserTechnologies;
 //=================PROJECT================================================================================================================================================================================
    $scope.userProjects=[];
    $scope.projectstechnologies = [];

    $scope.userProjects=ProjectServ.user.userCV.projects;
    console.log(ProjectServ.user);
    $scope.projectstechnologies = ProjectServ.user.userCV.projects.technologies;
    
   

    

});


angular.module('myApp').controller('technologiesCtrl', function($scope, technologies) {
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

    $scope.listOfUserTechnologies = technologies.listOfUserTechnologies;
});


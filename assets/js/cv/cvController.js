angular.module('myApp').controller('technologiesCtrl', function($scope, technologies, cvServise) {
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
    $scope.userTechnologies= [];
    cvServise.getUserData(function(user){
     
        $scope.userProjects = user.userCV.projects;
                        
        $scope.userTechnologies = user.userCV.technologies;
                    console.log(user.userCV.technologies);
       
    });
      

    

});

angular.module('myApp').filter('uniqueTechnology', function () {
    return function (collection) {
        var output = [],
            isFind = false;

        angular.forEach(collection, function (item) {
            isFind = false;

            angular.forEach(output, function (outputItem) {
                if (item.category.id == outputItem.category.id) {
                    isFind = true;
                }
            });

            if (!isFind) {
                output.push(item);
            }
        });
        
        return output;
    };
});
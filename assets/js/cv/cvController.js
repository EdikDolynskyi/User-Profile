angular.module('myApp').controller('technologiesCtrl', function($scope, technologies) {
    $scope.technologiesMainList = technologies.technologiesMainList;
    $scope.categoriesMainList = technologies.categoriesMainList;
    
    $scope.technologies = technologies;

    $scope.submit = function(msg){
        technologies.serSubmit(msg);
        if (!technologies.technologyTypeShow) {
            $scope.technologiesEnterText = '';
        }
    };

    $scope.technologiesList = technologies.technologiesList;
});


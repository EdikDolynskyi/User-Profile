angular.module('myApp').controller('technologiesCtrl', function($scope, technologies) {
    $scope.technologies = technologies.technologiesMainList;

    $scope.submit = function(msg){
        technologies.serSubmit(msg);
        $scope.technologiesEnterText = '';
    };

    $scope.technologiesList = technologies.technologiesList;

    $scope.techTypeShow = technologies.technologyTypeShow;
});


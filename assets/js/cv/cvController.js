angular.module('myApp').controller('technologiesCtrl', function($scope, technologies) {
    $scope.technologiesMainList = technologies.technologiesMainList;

    $scope.technologies = technologies;

    $scope.submit = function(msg){
        technologies.serSubmit(msg);
        $scope.technologiesEnterText = '';
    };

    $scope.technologiesList = technologies.technologiesList;
});


angular.module('myApp').controller('technologiesCtrl', function($scope, resourceGetDataService) {

        resourceGetDataService.resList().query(function( technologies ) {
            $scope.technologies = technologies;
        });

        $scope.technologiesList = [];
        $scope.submit = function() {
            if ($scope.technologiesEnterText) {
                if (this.technologiesEnterText.name == null) {
                    $scope.technologiesList.push(this.technologiesEnterText)
                } else {
                    $scope.technologiesList.push(this.technologiesEnterText.name);
                }
                $scope.technologiesEnterText = '';
            }
        };
});


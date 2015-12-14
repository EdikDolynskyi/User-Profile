var app = require('../angular-app');

app.controller('ModalConfirmCtrl', function($scope, $modalInstance, cvFactory, project, userProjects) {
    $scope.project = project;
    $scope.userProjects = userProjects;

    $scope.removeProject = function(){
        cvFactory.removeProject($scope.project, function(){
            var index = $scope.userProjects.indexOf($scope.project);
            $scope.userProjects.splice(index,1);
        });

        $modalInstance.dismiss('delete');
    };

    $scope.cancel = function ($event) {
        $event.preventDefault();
        $modalInstance.dismiss('cancel');
    };
});


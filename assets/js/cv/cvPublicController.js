var app = require('../angular-app');

app.controller('CVPublicController', function($scope, cvFactory) {
    $scope.userId = '';
    $scope.currentProject = '';
    $scope.userTechnologies = [];
    $scope.userProjects = [];
    $scope.knowledgeRating = 0;
    $scope.isCollapsed = true;
    $scope.showRating = false;

    cvFactory.getUserData(function (user) {
        $scope.userId = user.id;
        $scope.currentProject = user.currentProject;
        $scope.userTechnologies = user.userCV.technologies;
    });


    cvFactory.getUserProjects(function (projects) {
        $scope.userProjects = projects;

        for (var i = 0; i < $scope.userProjects.length; i++) {
            if ($scope.userProjects[i].id == $scope.currentProject) {
                $scope.userProjects[i].current = true;

                break;
            }
        }
    });

});


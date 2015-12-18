var app = require('../angular-app');

app.controller('CVPublicController', function($scope, cvFactory, $rootScope, $route, $location, prefix) {
    $scope.prefix = prefix;
    $scope.userId = '';
    $scope.currentProject = '';
    $scope.userTechnologies = [];
    $scope.userProjects = [];
    $scope.knowledgeRating = 0;
    $scope.isCollapsed = true;
    $scope.showRating = false;
    var userId = $route.current.params.userId;
    $rootScope.userId = userId;
    $scope.userId = userId;   
    $scope.knowledge = 0;
    cvFactory.getUserData(userId, function (user) {
        $scope.currentProject = user.currentProject;
        $scope.userTechnologies = user.userCV.technologies;
        cvFactory.getUserProjects($scope.userId, function (projects) {
            $scope.userProjects = projects;
            for (var i = 0; i < $scope.userProjects.length; i++) {
                if ($scope.userProjects[i].id == $scope.currentProject) {
                    $scope.userProjects[i].current = true;

                    break;
                }
            }
        });
    });
    $scope.findUser = function($event, id) {
        $event.preventDefault();
        $location.path('/userdata/' + id);
    };
});


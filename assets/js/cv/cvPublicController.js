var app = require('../angular-app');

app.controller('CVPublicController', function($scope, cvPublicFactory) {
    $scope.userTechnologies = [];
    $scope.userProjects = [];
    $scope.allTechnologies = [];
    $scope.allProjects = [];
    $scope.allCategories = [];
    $scope.users_projects = [];
    $scope.knowledgeRating = 0;
    $scope.startDate = '';
    $scope.isCollapsed = true;
    $scope.showRating = false;
    $scope.showTechForm1 = false;
    $scope.showTechForm2 = false;
    $scope.showProjectForm1 = false;
    $scope.showProjectForm2 = false;
    $scope.technology = {};
    $scope.project = {};
    $scope.project.technologies = [];

    cvPublicFactory.getUserData(function(user) {
        $scope.userProjects = user.userCV.projects;
        $scope.userTechnologies = user.userCV.technologies;
        $scope.userCV = user.userCV;
    });

    cvPublicFactory.getAllCategories(function(categories) {
        $scope.allCategories = categories;
    });

    cvPublicFactory.getAllTechnologies(function(technologies) {
        $scope.allTechnologies = technologies;
    });

    cvPublicFactory.getAllProjects(function(projects) {
        $scope.allProjects = projects;
    });

    cvPublicFactory.getUsersProjects(function(res) {
        $scope.users_projects = res;
    });

    $scope.enterProjectName = function($event, project) {
        if ($event.keyCode == 13) {
            $event.preventDefault();
            $scope.findProject(project);
        }
    };

    $scope.enterTechnologyName = function($event, technology) {
        if ($event.keyCode == 13) {
            $event.preventDefault();
            $scope.addTechnologiesToProject(technology);
        }
    };
});
/****************************************************************************
 *                                                                           *
 *                              CUSTOM FILTERS                               *
 *                                                                           *
 ****************************************************************************/
angular.module('myApp').filter('uniqueTechnology', function() {
    return function(collection) {
        var output = [];
        var isFound = false;

        angular.forEach(collection, function(item) {
            isFound = false;

            angular.forEach(output, function(outputItem) {
                if (item.category.id == outputItem.category.id) {
                    isFound = true;
                }
            });

            if (!isFound) {
                output.push(item);
            }
        });
        return output;
    };
});
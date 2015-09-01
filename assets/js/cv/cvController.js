var app = require('../angular-app');

app.controller('CVController', function($scope, cvFactory) {
    $scope.userId = "";
    $scope.userTechnologies = [];
    $scope.userProjects = [];
    $scope.allTechnologies = [];
    $scope.allProjects = [];
    $scope.allCategories = [];
    $scope.users_projects = [];
    $scope.knowledgeRating = 0;
    $scope.userRole = '';
    $scope.startDate = '';
    $scope.endDate = '';
    $scope.isCollapsed = true;
    $scope.showRating = false;
    $scope.showTechForm1 = false;
    $scope.showTechForm2 = false;
    $scope.showProjectForm1 = false;
    $scope.showProjectForm2 = false;
    $scope.technology = {};
    $scope.project = {};
    $scope.project.technologies = [];



    cvFactory.getUserData(function(user) {
        $scope.userId = user.id;
        $scope.userTechnologies = user.userCV.technologies;
        $scope.userCV = user.userCV;
    });

    cvFactory.getAllCategories(function(categories) {
        $scope.allCategories = categories;
    });

    cvFactory.getAllTechnologies(function(technologies) {
        $scope.allTechnologies = technologies;
    });

    cvFactory.getAllProjects(function(projects) {
        $scope.allProjects = projects;
    });

    cvFactory.getUserProjects(function(projects) {
        $scope.userProjects = projects;
    });



    $scope.addTechnologiesToProject = function(technology) {
        if (technology !== '') {
            $scope.project.technologies.push(technology);

            $scope.projectTechnology = '';
        }
    };

    $scope.enterTechnologyName = function($event, technology) {
        if ($event.keyCode == 13) {
            $event.preventDefault();
            $scope.addTechnologiesToProject(technology);
        }
    };

    $scope.selectTechCategory = function(category) {
        $scope.technology.category = JSON.parse(category);
    };

    $scope.addTechnologyToCV = function(tech, stars) {
        var selectedTech = JSON.parse(tech);
        selectedTech.stars = stars || 1;

        cvFactory.addTechnologyToCV(selectedTech, $scope.userCV, function(res) {
            $scope.userTechnologies.push(res);
        });

        $scope.tech = "";
        $scope.stars = "";
    };

    $scope.createTechnology = function(tech) {
        cvFactory.createTechnology(tech, $scope.userCV, function(newTech) {
            newTech.stars = tech.stars || 1;

            cvFactory.addTechnologyToCV(newTech, $scope.userCV, function(res) {
                $scope.userTechnologies.push(res);
            });
        });

        $scope.technology = {};
        $scope.techcategory = "";
    };

    $scope.updateCVTechnologies = function(tech){
        cvFactory.updateCVTechnologies(tech, $scope.userCV);
    };

    $scope.createProject = function(project, userRole, startDate, endDate) {
        cvFactory.createProject(project, userRole, startDate, endDate, function(id) {
            cvFactory.getProject(id, function(project) {
                $scope.userProjects.push(project);
            });
        });
    };

    $scope.selectProject = function(project, userRole, startDate, endDate) {
        project = JSON.parse(project);
        cvFactory.selectProject(project, userRole, startDate, endDate, function(id) {
            cvFactory.getProject(id, function(project) {
                $scope.userProjects.push(project);
            });
        });
    };

    $scope.removeProject = function($event, project){
        $event.stopPropagation();

        cvFactory.removeProject(project, function(){
            var index=$scope.userProjects.indexOf(project);
            $scope.userProjects.splice(index,1);
        })
    }

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
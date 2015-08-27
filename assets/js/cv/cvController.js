var app = require('../angular-app');

app.controller('CVController', function($scope, cvFactory) {
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




    cvFactory.getUserData(function(user) {
        $scope.userProjects = user.userCV.projects;
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

    cvFactory.getUsersProjects(function(res) {
        $scope.users_projects = res;
    });

    $scope.enterProjectName = function($event, project) {
        if ($event.keyCode == 13) {
            $event.preventDefault();
            $scope.findProject(project);
        }
    };

    $scope.addTechnologiesToProject = function(technology) {
        if (technology !== '') {
            $scope.project.technologies.push(technology);

            $scope.projectTech = '';
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

    $scope.addProjectToCV = function(project, startDate) {
        var selectedProject = JSON.parse(project);
        selectedProject.startDate = startDate;

        cvFactory.addProjectToCV(selectedProject, $scope.userCV, $scope.users_projects, function(project) {

            var technologies = [];
            angular.forEach(project.technologies, function(projectTechnology) {
                angular.forEach($scope.allTechnologies, function(technology) {
                    if (projectTechnology == technology.id) {
                        technologies.push(technology);
                    }

                });
            });

            project.technologies = technologies;
            $scope.userProjects.push(project);

            $scope.selectedProject = "";
            $scope.startDate = "";
        });
    };

    $scope.createProject = function(project, startDate) {
        console.log(project, startDate);

        cvFactory.createProject(project, $scope.userCV, function(newProject) {
            newProject.startDate = startDate;

            cvFactory.addProjectToCV(newProject, $scope.userCV, function(res) {
                res.startDate = newProject.startDate;
                res.technologies = newProject.technologies;

                $scope.userProjects.push(res);
            });
        });

        $scope.project = {};
        $scope.startDate = "";
    };

    /*$scope.removeProject = function(project) {
        var index = $scope.userProjects.indexOf(project);
        cvFactory.removeProject(project, $scope.userCV, function() {
            ///some code
        });
    }*/
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
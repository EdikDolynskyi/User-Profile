var app = require('../angular-app');

app.controller('CVController', function($scope, cvFactory) {
    $scope.userId = '';
    $scope.currentProject = '';
    $scope.userTechnologies = [];
    $scope.userProjects = [];
    $scope.allTechnologies = [];
    $scope.allProjects = [];
    $scope.allCategories = [];
    $scope.users_projects = [];
    $scope.knowledgeRating = 0;
    $scope.isCollapsed = true;
    $scope.showRating = false;
    $scope.showTechForm1 = false;
    $scope.showTechForm2 = false;
    $scope.showProjectForm1 = false;
    $scope.showProjectForm2 = false;
    $scope.technology = {};
    $scope.project = {};
    $scope.project.technologies = [];
    $scope.selProject = {};
    $scope.selTech = {};

    cvFactory.getUserData(function(user) {
        $scope.userId = user.id;
        $scope.currentProject = user.currentProject;
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

        for (var i=0; i<$scope.userProjects.length; i++) {
            if($scope.userProjects[i].id == $scope.currentProject ) {
                $scope.userProjects[i].current = true;

                break;
            }
        }
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

    $scope.selectTechnology= function(tech) {
        cvFactory.selectTechnology(tech, $scope.userCV.id, function(id) {
            cvFactory.getTechnology(id, function(res) {
                res.stars = tech.stars || 1;
                res.stars.toString();
                $scope.userTechnologies.push(res);
            });
        });

        $scope.selTech= {};
    };

    $scope.createTechnology = function(tech) {
        cvFactory.createTechnology(tech, $scope.userCV.id, function(id) {
            cvFactory.getTechnology(id, function(res) {
                res.stars = tech.stars || 1;
                res.stars.toString();
                $scope.userTechnologies.push(res);
            });
        });

        $scope.technology = {};
    };

    $scope.updateCVTechnology = function(tech){
        cvFactory.updateCVTechnology(tech, $scope.userCV.id);
    };

    $scope.createProject = function(project) {
        cvFactory.createProject(project, function(id) {
            cvFactory.getProject(id, function(res) {
                $scope.userProjects.push(res);
            });
        });


        $scope.project = {};
    };

    $scope.selectProject = function(project) {
        cvFactory.selectProject(project, function(id) {
            cvFactory.getProject(id, function(res) {
                $scope.userProjects.push(res);
            });
        });

        $scope.selProject = {};
    };

    $scope.removeProject = function($event, project){
        $event.stopPropagation();

        cvFactory.removeProject(project, function(){
            var index = $scope.userProjects.indexOf(project);
            $scope.userProjects.splice(index,1);
        })
    };

    $scope.removeTechnology = function($event, technology) {
        $event.stopPropagation();

        cvFactory.removeTechnology(technology, $scope.userCV.id, function(){
            var index = $scope.userTechnologies.indexOf(technology);
            $scope.userTechnologies.splice(index,1);
        })
    }

});

/****************************************************************************
 *                                                                           *
 *                              CUSTOM FILTERS                               *
 *                                                                           *
 ****************************************************************************/
app.filter('uniqueTechnology', function() {
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

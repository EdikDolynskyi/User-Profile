var app = require('../angular-app');

app.controller('CVController', function($scope, cvPublicFactory) {
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

    cvPublicFactory.getUserData(function(user) {
        $scope.userId = user.id;
        $scope.currentProject = user.currentProject;
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

    cvPublicFactory.getUserProjects(function(projects) {
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
        cvPublicFactory.selectTechnology(tech, $scope.userCV.id, function(id) {
            cvPublicFactory.getTechnology(id, function(res) {
                res.stars = tech.stars || 1;
                res.stars.toString();
                $scope.userTechnologies.push(res);
            });
        });

        $scope.selTech= {};
    };

    $scope.createTechnology = function(tech) {
        cvPublicFactory.createTechnology(tech, $scope.userCV.id, function(id) {
            cvPublicFactory.getTechnology(id, function(res) {
                res.stars = tech.stars || 1;
                res.stars.toString();
                $scope.userTechnologies.push(res);
            });
        });

        $scope.technology = {};
    };

    $scope.updateCVTechnology = function(tech){
        cvPublicFactory.updateCVTechnology(tech, $scope.userCV.id);
    };

    $scope.createProject = function(project) {
        cvPublicFactory.createProject(project, function(id) {
            cvPublicFactory.getProject(id, function(res) {
                $scope.userProjects.push(res);
            });
        });


        $scope.project = {};
    };

    $scope.selectProject = function(project) {
        cvPublicFactory.selectProject(project, function(id) {
            cvPublicFactory.getProject(id, function(res) {
                $scope.userProjects.push(res);
            });
        });

        $scope.selProject = {};
    };

    $scope.removeProject = function($event, project){
        $event.stopPropagation();

        cvPublicFactory.removeProject(project, function(){
            var index = $scope.userProjects.indexOf(project);
            $scope.userProjects.splice(index,1);
        })
    };

    $scope.removeTechnology = function($event, technology) {
        $event.stopPropagation();

        cvPublicFactory.removeTechnology(technology, $scope.userCV.id, function(){
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

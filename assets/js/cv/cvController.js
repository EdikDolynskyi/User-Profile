var app = require('../angular-app');

app.controller('CVController', function($scope, cvFactory, uploadService) {
    $scope.userId = '';
    $scope.userCV = '';
    $scope.currentProject = '';
    $scope.userTechnologies = [];
    $scope.userProjects = [];
    $scope.allTechnologies = [];
    $scope.allProjects = [];
    $scope.allCategories = [];
    $scope.knowledge = 0;
    $scope.isCollapsed = true;
    $scope.showRating = false;
    $scope.showTechForm1 = false;
    $scope.showTechForm2 = false;
    $scope.showProjectForm1 = false;
    $scope.showProjectForm2 = false;
    $scope.technology = {};
    $scope.originalProject = {};
    $scope.project = {};
    $scope.project.technologies = [];
    $scope.project.screenshots = [];
    $scope.selProject = {};
    $scope.selTech = {};
    $scope.editMode= false;

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

    $scope.removeTechnology = function($event, technology) {
        $event.stopPropagation();

        cvFactory.removeTechnology(technology, $scope.userCV.id, function(){
            var index = $scope.userTechnologies.indexOf(technology);
            $scope.userTechnologies.splice(index,1);
        })
    };

    $scope.selectProject = function(project) {
        cvFactory.selectProject(project, function(id) {
            cvFactory.getProject(id, function(res) {
                $scope.userProjects.push(res);
            });
        });

        $scope.selProject = {};
    };

    $scope.createProject = function(project) {
        cvFactory.createProject(project, function(id) {
            cvFactory.getProject(id, function(res) {
                $scope.userProjects.push(res);
            });
        });


        $scope.project = {};
        $scope.project.technologies = [];
        $scope.project.screenshots = [];
    };

    $scope.updateProject = function(project) {
        cvFactory.updateProject(project);
        $scope.editMode = false;
    };

    $scope.editProject = function($event, project) {
        $event.stopPropagation();

        if(this.isCollapsed) {
            this.isCollapsed = !this.isCollapsed;
        }

        $scope.editMode = true;
        $scope.originalProject = angular.copy(project);
    };

    $scope.removeProject = function($event, project){
        $event.stopPropagation();

        cvFactory.removeProject(project, function(){
            var index = $scope.userProjects.indexOf(project);
            $scope.userProjects.splice(index,1);
        })
    };

    $scope.cancelCreating = function() {
        $scope.showProjectForm2 = false;
        $scope.project.technologies = [];
        $scope.project.screenshots = [];
    };

    $scope.cancelEditing = function(projectID) {
        $scope.editMode = false;

        for(var i = 0; i < $scope.userProjects.length; i++) {
            if($scope.userProjects[i]._id == projectID) {
                $scope.userProjects[i] = $scope.originalProject;
                break;
            }
        }
    };

    $scope.upload = function (file) {
        uploadService.upload(file, function (fileSrc) {
            var prefix = window.location.pathname;
            $scope.project.screenshots.push({img: prefix + fileSrc});
        });
    };

});

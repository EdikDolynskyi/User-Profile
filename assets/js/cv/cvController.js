var app = require('../angular-app');

app.controller('CVController', function($scope, $modal, $location, cvFactory, uploadService) {
    $scope.userId = '';
    $scope.userCV = '';
    $scope.allTechnologies = [];
    $scope.allProjects = [];
    $scope.allCategories = [];
    $scope.knowledge = 0;
    $scope.isCollapsed = true;
    $scope.editMode= false;
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


    cvFactory.getUserData(function(user) {
        $scope.userId = user.id;
        $scope.userCV = user.userCV;
        $scope.userCV.technologies = user.userCV.technologies;
        $scope.userCV.currentProject = user.currentProject;
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
        $scope.userCV.projects = projects;

        for (var i=0; i<$scope.userCV.projects.length; i++) {
            if($scope.userCV.projects[i].id == $scope.userCV.currentProject ) {
                $scope.userCV.projects[i].current = true;

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
                $scope.userCV.technologies.push(res);
            });
        });

        $scope.selTech= {};
    };

    $scope.createTechnology = function(tech) {
        cvFactory.createTechnology(tech, $scope.userCV.id, function(id) {
            cvFactory.getTechnology(id, function(res) {
                res.stars = tech.stars || 1;
                res.stars.toString();
                $scope.userCV.technologies.push(res);
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
            var index = $scope.userCV.technologies.indexOf(technology);
            $scope.userCV.technologies.splice(index,1);
        })
    };

    $scope.selectProject = function(project) {
        cvFactory.selectProject(project, function(id) {
            cvFactory.getProject(id, function(res) {
                $scope.userCV.projects.push(res);
            });
        });

        $scope.selProject = {};
    };

    $scope.selectFile = function(file){
        if(file) $scope.project.screenshots.push(file);
    };

    $scope.createProject = function(project) {
        uploadService.uploadMultipleFiles(project.screenshots, function(res){
            if(res) {
                var prefix = window.location.pathname;

                for(var i = 0; i < project.screenshots.length; i++) {
                    project.screenshots[i] = {img: prefix + res[i]}
                }
            }

            cvFactory.createProject(project, function(projectId) {
                cvFactory.getProject(projectId, function(project) {
                    $scope.userCV.projects.push(project);
                });
            });

            $scope.project = {};
            $scope.project.technologies = [];
            $scope.project.screenshots = [];
        });
    };

    $scope.updateProject = function(project) {
        cvFactory.updateProject(project);
        this.editMode = false;

        if(project.current) {
            for (var i=0; i<$scope.userCV.projects.length; i++) {
                if ($scope.userCV.projects[i].id == project.id) { continue; }
                $scope.userCV.projects[i].current = false;

            }
        }
    };

    $scope.editProject = function($event, project) {
        $event.stopPropagation();

        if(this.isCollapsed) {
            this.isCollapsed = !this.isCollapsed;
        }

        this.editMode = true;
        $scope.originalProject = angular.copy(project);
    };

    $scope.cancelCreating = function() {
        $scope.showProjectForm2 = false;
        $scope.project.technologies = [];
        $scope.project.screenshots = [];
    };

    $scope.cancelEditing = function(projectID) {
        this.editMode = false;

        for(var i = 0; i < $scope.userCV.projects.length; i++) {
            if($scope.userCV.projects[i]._id == projectID) {
                $scope.userCV.projects[i] = $scope.originalProject;
                break;
            }
        }
    };

    $scope.removeScreenshot = function(screenshot) {
        var index = $scope.project.screenshots.indexOf(screenshot);
        $scope.project.screenshots.splice(index, 1);
    };

    $scope.open = function(selected, screenshots) {
        var modalInstance = $modal.open({
            //animation: $scope.animationsEnabled,
            templateUrl: 'modalImage.html',
            controller: 'ModalImageCtrl',
            resolve: {
                selected: function() {
                    return selected;
                },
                images: function () {
                    return screenshots;
                }
            }
        });

    };

    $scope.confirmDelete = function($event, size, project) {
        $event.stopPropagation();

        var modalInstance = $modal.open({
            //animation: $scope.animationsEnabled,
            templateUrl: 'modalConfirm.html',
            controller: 'ModalConfirmCtrl',
            size: size,
            resolve: {
                project: function() {
                    return project;
                },
                userProjects: function () {
                    return $scope.userCV.projects;
                }
            }
        });

    };

    $scope.findUser = function($event, id) {
        $event.preventDefault();
        $location.path('/userdata/' + id);
    }

});



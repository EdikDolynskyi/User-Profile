var app = require('../angular-app');
var _ = require('underscore');


app.controller('CVController', function($scope, $modal, $location, cvFactory, uploadService, prefix) {
	$scope.prefix = prefix;
	$scope.userId = '';
	$scope.userCV = '';
	$scope.allTechnologies = [];
	$scope.allProjects = [];
	$scope.allCategories = [];
	$scope.knowledge = 0;
	$scope.isCollapsed = true;
	$scope.editMode= false;
	$scope.showRating = false;
	$scope.showProjectForm1 = false;
	$scope.showProjectForm2 = false;
	$scope.technology = {};
	$scope.originalProject = {};
	$scope.project = {};
	$scope.project.technologies = [];
	$scope.project.screenshots = [];
	$scope.selProject = {};
	$scope.selTech = {};
	$scope.newScreenshots = [];
	$scope.showSelectTechnology = true;
	$scope.showTechFormProject = false;

	$scope.template = prefix + 'js/cv/technologyForm.html';
	$scope.template2 = prefix + 'js/cv/technologyFormForProject.html';
	$scope.template3 = prefix + 'js/cv/projectForm1.html';
	$scope.template4 = prefix + 'js/cv/projectForm2.html';

	cvFactory.getUserData(null, function(user) {
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

	cvFactory.getUserProjects($scope.userId, function(projects) {
		$scope.userCV.projects = projects;

		for (var i=0; i<$scope.userCV.projects.length; i++) {
			$scope.userCV.projects[i].path =  $location.protocol() + "://" + $location.host() + 
			":" + $location.port() + "/#/projects/" + $scope.userCV.projects[i].id; 
			
			if($scope.userCV.projects[i].id == $scope.userCV.currentProject ) {
				$scope.userCV.projects[i].current = true;

				break;
			}
		}
	});

	$scope.addTechnologiesToProject = function(technology) {
		if (technology !== '' && typeof technology == "object") {
			var correctTechnology = Boolean(_.where($scope.allTechnologies, {name: technology.name, id: technology.id}).length);
			var technologyExist = Boolean(_.where($scope.project.technologies, {name: technology.name, id: technology.id}).length);
			if(correctTechnology && !technologyExist){
				$scope.project.technologies.push(technology);
			}
		}
	};

	$scope.enterTechnologyName = function($event, technology) {
		if ($event.keyCode == 13) {
			$event.preventDefault();
			$scope.addTechnologiesToProject(technology);
			$scope.projectTechnology = '';
		}
	};

	$scope.enterTechnologyNameForTech = function($event, technology) {
		$scope.showSelectTechnology = !$scope.checkExistTechnology(technology);
		if ($event.keyCode == 13) {
			$event.preventDefault();
			$scope.addTechnologiesToProject(technology);
			$scope.projectTechnology = '';
		}
	};

	$scope.checkExistTechnology = function(technology){
		var technologyExist;
		if(typeof technology.name == 'object'){
			var techName = technology.name.name;
			var technologyExist = Boolean(_.where($scope.allTechnologies, {name: techName}).length);
		} else {
			var technologyExist = Boolean(_.where($scope.allTechnologies, {name: technology.name}).length);
		}
		return technologyExist;
	};

	$scope.addTechnology = function(technologyForm, technology){
		var cvId = $scope.userCV.id;

		if(technology.stars == 0) {
			form.knowledge.$setValidity("required", false);
			return;
		}

		if(technologyForm.$valid) {
			if($scope.showSelectTechnology){
				cvFactory.createTechnology(technology, cvId, function(technologyId) {
					cvFactory.getTechnology(cvId, technologyId, function(res) {
						$scope.userCV.technologies.push(res);
					});
				});
			} else {
				var selectedTech = {
					id: technology.name.id,
					stars: technology.stars
				};

				cvFactory.selectTechnology(selectedTech, cvId, function(technologyId) {
					cvFactory.getTechnology(cvId, technologyId, function(res) {
						$scope.userCV.technologies.push(res);
					});
				});
			}
			$scope.showTechFormForProject = !$scope.showTechFormForProject;
		}
	};

	//editing mode
	$scope.addTechnologyToProject = function(technology, project){
		project.technologies.push(technology.name);
	}

	$scope.cancelCreatingTechnology = function(form) {
		$scope.showTechForm = !$scope.showTechForm;
		$scope.technology = {};
		form.$setPristine();
	};

	$scope.cancelCreatingTechForProject =function(form){
		$scope.showTechFormForProject = !$scope.showTechFormForProject;
		form.$setPristine();
	};

	$scope.updateTechnology = function(tech){
		cvFactory.updateCVTechnology(tech, $scope.userCV.id);
	};

	$scope.removeTechnology = function($event, technology) {
		$event.stopPropagation();

		cvFactory.removeTechnology(technology, $scope.userCV.id, function(){
			var index = $scope.userCV.technologies.indexOf(technology);
			$scope.userCV.technologies.splice(index,1);
		})
	};

	$scope.removeTechnologyFromProject = function($event, technology, project) {
		$event.stopPropagation();
		project.technologies = _.reject(project.technologies, function(item) {
			return item.id === technology.id; 
		});
	};

	$scope.selectProject = function(form, project) {
		if(form.$valid) {
			cvFactory.selectProject(project, function(id) {
				cvFactory.getProject(id, function(res) {
					$scope.userCV.projects.push(res);
				});
			});

			$scope.selProject = {};
			form.$setPristine();
			$scope.showProjectForm1 = !$scope.showProjectForm1;
		}
	};

	$scope.cancelSelectingProject = function(form) {
		$scope.showProjectForm1 = false;
		$scope.project = {};
		$scope.project.technologies = [];
		$scope.project.screenshots = [];
		form.$setPristine();
	};

	$scope.selectFile = function(file){
		if(file) $scope.project.screenshots.push(file);
	};

	$scope.createProject = function(form, project) {
		if(form.$valid) {
			uploadService.uploadMultipleFiles(project.screenshots, function(res){
				if(res) {

					for(var i = 0; i < project.screenshots.length; i++) {
						project.screenshots[i] = {img: res[i]}
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
				form.$setPristine();
				$scope.showProjectForm2 = false;
			});
		}
	};

	$scope.cancelCreatingProject = function(form) {
		$scope.showProjectForm2 = false;
		$scope.project = {};
		$scope.project.technologies = [];
		$scope.project.screenshots = [];
		form.$setPristine();
	};

	$scope.updateProject = function(project) {
		
		var self = this;
		uploadService.uploadMultipleFiles($scope.newScreenshots, function(res){
			if(res) {

				for(var i = 0; i < $scope.newScreenshots.length; i++) {
					$scope.newScreenshots[i] = {img: res[i]}
				}

				project.screenshots = project.screenshots.concat($scope.newScreenshots);
				$scope.newScreenshots = [];
			}

			cvFactory.updateProject(project);
			cvFactory.getObjectProject(project.id, function(originProject) {
				originProject.screenshots = project.screenshots;
				originProject.description = project.description;
				originProject.name = project.name;
				originProject.start = project.start;
				originProject.end = project.end;
				originProject.technologies = _.map(project.technologies, function(item){
					return item.id;
				});
				
				cvFactory.updateObjectProject(originProject, function(res){
					if(res[0] + res[1] == "OK"){
						alert('Project successfully saved');
						self.editMode = false;                  
						self.isCollapsed = !self.isCollapsed;
					}
				});
			});
		});
	};

	$scope.editProject = function($event, project) {
		$event.stopPropagation();

		if(this.isCollapsed) {
			this.isCollapsed = !this.isCollapsed;
		}

		this.editMode = true;
		$scope.originalProject = angular.copy(project);
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

	$scope.goToProject = function($event, projectId){
		$event.preventDefault();
		$location.path('/projects/' + projectId);
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
	};

	$scope.removeScreenshotAfterEdit = function(project, screenshot){
		project.screenshots = _.reject(project.screenshots, function(item) {
			return item.img === screenshot.img; 
		});
	};

	$scope.removeNewScreenshot = function(newScreenshot){
		 $scope.newScreenshots = _.reject($scope.newScreenshots, function(item) {
			return item.$$hashKey === newScreenshot.$$hashKey; 
		});
	};

	$scope.addNewScreenshot = function(file, project){
		if(file){
			$scope.newScreenshots.push(file);
		}
	};

});



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
	$scope.project = {};
	$scope.project.technologies = [];
	$scope.project.screenshots = [];
	$scope.selProject = {};
	$scope.selTech = {};
	$scope.showSelectTechnology = true;

	$scope.template = prefix + '/js/cv/technologyForm.html';
	$scope.template2 = prefix + '/js/cv/technologyFormForProject.html';
	$scope.template3 = prefix + '/js/cv/projectForm1.html';
	$scope.template4 = prefix + '/js/cv/projectForm2.html';

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
			"/profile/#/projects/" + $scope.userCV.projects[i].id;
			$scope.userCV.projects[i].editMode = false;
			$scope.userCV.projects[i].isCollapsed = true;
			$scope.userCV.projects[i].newScreenshots = [];
			$scope.userCV.projects[i].showTechFormProject = false;
			$scope.userCV.projects[i].projectTechFieldValid = true;
			
			if($scope.userCV.projects[i].id == $scope.userCV.currentProject ) {
				$scope.userCV.projects[i].current = true;

				break;
			}
		}
	});

	$scope.addTechnologiesToProject = function(project, technology) {
		if (technology !== '' && typeof technology == "object") {
			var correctTechnology = Boolean(_.where($scope.allTechnologies, {name: technology.name, id: technology.id}).length);
			var technologyExist = Boolean(_.where($scope.project.technologies, {name: technology.name, id: technology.id}).length);
			if(correctTechnology && !technologyExist){
				$scope.project.technologies.push(technology);
			}
		}
	};

	$scope.enterTechnologyName = function($event, technology, project) {
		if ($event.keyCode == 13) {
			$event.preventDefault();
			$scope.addTechnologiesToProject(project, technology);
			$scope.projectTechnology = '';
		}
	};

	$scope.enterTechnologyNameForTech = function($event, technology) {
		$scope.showSelectTechnology = !$scope.checkExistTechnology(technology);
		if ($event.keyCode == 13) {
			$event.preventDefault();
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
		} else {
			var fields = ['technologies', 'category', 'knowledge'];
			$scope.setStateOfFields(fields, technologyForm);
		}
	};

	//editing mode
	$scope.addTechnologyToProject = function(technology, project){
		if(technology.name){
			var techName = typeof technology.name == 'object' ? technology.name.name : technology.name
			var technologyExistInAll = Boolean(_.where($scope.allTechnologies, {name: techName}).length);
			var technologyExistInProject = Boolean(_.where(project.technologies, {name: techName}).length);
			if(technologyExistInAll && !technologyExistInProject) project.technologies.push(technology.name);
		}
	}

	$scope.cancelCreatingTechnology = function(form) {
		$scope.showTechForm = !$scope.showTechForm;
		$scope.technology = {};
		form.$setPristine();
	};

	$scope.cancelCreatingTechForProject =function(project){
		project.showTechFormProject = false;
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
		else {
			var fields = ['project', 'userrole', 'startDateSelectProject']
			$scope.setStateOfFields(fields, form);
		}
	};

	$scope.cancelSelectingProject = function(form) {
		$scope.showProjectForm1 = false;
		$scope.project = {};
		$scope.project.technologies = [];
		$scope.project.screenshots = [];
		form.$setPristine();
	};

	$scope.selectFile = function(file, project){
		if(file) project.screenshots.push(file);
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

				project = {};
				project.technologies = [];
				project.screenshots = [];
				form.$setPristine();
				$scope.showProjectForm2 = false;
			});
		} else{
			var fields = ['name', 'start', 'userrole', 'startdate']
		$scope.setStateOfFields(fields, form);
		}
	};

	$scope.cancelCreatingProject = function(form, project) {
		$scope.showProjectForm2 = false;
		project = {};
		project.technologies = [];
		project.screenshots = [];
		form.$setPristine();
	};

	$scope.updateProject = function(project) {

		var projectNameValid = Boolean(project.name);
		var projectStartDateValid = Boolean(project.start);
		var projectUserRoleValid = Boolean(project.userRole);
		var projectStartDateJoinValid = Boolean(project.startDate);

		if(projectNameValid && projectStartDateValid && projectUserRoleValid && projectStartDateJoinValid){
			uploadService.uploadMultipleFiles(project.newScreenshots, function(res){
				if(res) {

					for(var i = 0; i < project.newScreenshots.length; i++) {
						project.newScreenshots[i] = {img: res[i]}
					}

					project.screenshots = project.screenshots.concat(project.newScreenshots);
					project.newScreenshots = [];
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
							project.editMode = false;                  
							project.isCollapsed = true;
						}
					});
				});
			});
		}
	};

	$scope.editProject = function($event, project) {
		$event.stopPropagation();

		project.isCollapsed = false;
		project.editMode = true;
		project.originalProject = angular.copy(project);
	};

	$scope.cancelEditing = function(projectID, project) {

		project = angular.copy(project.originalProject);
		project.editMode = false;
		project.isCollapsed = true;

		for(var i = 0; i < $scope.userCV.projects.length; i++) {
			if($scope.userCV.projects[i]._id == projectID) {
				$scope.userCV.projects[i] = project;
				break;
			}
		}

	};

	$scope.removeScreenshot = function(project, screenshot) {
		var index = project.screenshots.indexOf(screenshot);
		project.screenshots.splice(index, 1);
	};

	$scope.goToProject = function($event, projectId){
		$event.preventDefault();
		$location.path('/projects/' + projectId);
	};

	$scope.open = function(selected, screenshots) {
		if(selected.hasOwnProperty('img')){
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
		} else {
			alert('You can`t view image file. For view image you must save changes.');
		}

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

	$scope.removeNewScreenshot = function(newScreenshot, project){
		 project.newScreenshots = _.reject(project.newScreenshots, function(item) {
			return item.$$hashKey === newScreenshot.$$hashKey; 
		});
	};

	$scope.addNewScreenshot = function(file, project){
		if(file){
			if(!project.hasOwnProperty('newScreenshots')){
				project.newScreenshots = [];
			}
			project.newScreenshots.push(file);
		}
	};

	$scope.setStateOfFields = function(fields, form){
		for(var i=0; i<fields.length; i++){
			form[fields[i]].$setDirty();
			form[fields[i]].$setTouched();
		}
	};

});



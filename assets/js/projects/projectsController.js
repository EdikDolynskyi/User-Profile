var app = require('../angular-app');

app.controller('ProjectsController', function($scope, ProjectsFactory, $routeParams, prefix, $modal) {
	var vm = $scope;
	$scope.prefix = prefix;
	$scope.currentProject = '';
	vm.userTechnologies = [];
	vm.userProjects = [];
	vm.allTechnologies = [];
	vm.allProjects = [];
	vm.allCategories = [];
	vm.users_projects = [];
	vm.knowledgeRating = 0;
	vm.isCollapsed = false;
	vm.showRating = false;
	vm.showTechForm1 = false;
	vm.showTechForm2 = false;
	vm.showProjectForm1 = false;
	vm.showProjectForm2 = false;
	vm.technology = {};
	vm.project = {};
	vm.project.technologies = [];
	vm.selProject = {};
	vm.selTech = {};

	var projectId = $routeParams.projectId;
	ProjectsFactory.getProject(projectId, function(res) {
		vm.currentProject = res;
	});

	ProjectsFactory.getAllCategories(function(categories) {
		vm.allCategories = categories;
	});

	ProjectsFactory.getAllTechnologies(function(technologies) {
		vm.allTechnologies = technologies;
	});

	ProjectsFactory.getAllProjects(function(projects) {
		vm.allProjects = projects;
	});

	// ProjectsFactory.getUserProjects(function(projects) {
	//     vm.userProjects = projects;

	//     for (var i=0; i<vm.userProjects.length; i++) {
	//         if(vm.userProjects[i].id == vm.currentProject ) {
	//             vm.userProjects[i].current = true;

	//             break;
	//         }
	//     }
	// });

	vm.addTechnologiesToProject = function(technology) {
		if (technology !== '') {
			vm.project.technologies.push(technology);

			vm.projectTechnology = '';
		}
	};

	vm.selectProject = function(project) {
		ProjectsFactory.selectProject(project, function(id) {
			ProjectsFactory.getProject(id, function(res) {
				vm.userProjects.push(res);
			});
		});

		vm.selProject = {};
	};

	vm.open = function(selected, screenshots) {
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
		}
	};
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

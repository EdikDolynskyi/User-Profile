angular.module('myApp').controller('technologiesCtrl', function($scope, cvFactory) {
    /****************************************************************************
     *                                                                           *
     *                               SCOPE VARIABLE                              *
     *                                                                           *
     ****************************************************************************/

    $scope.userProjects = [];
    $scope.allProjects = [];
    $scope.userTechnologies = [];
    $scope.allCategories = [];
    $scope.allTechnologies = [];
    $scope.filtrRate = 0;
    $scope.projectName = '';
    $scope.technologiesInNewProject = [];
    $scope.updateProjectId = '';
    $scope.startDate = '';
    $scope.isCollapsed = true;
    $scope.showRating = false;
    $scope.showTechForm1 = false;
    $scope.showTechForm2 = false;
    $scope.showProjectForm1 = false;
    $scope.showProjectForm2 = false;
    $scope.technology = {};


    /****************************************************************************
     *                                                                           *
     *                               cvServise                                   *
     *                                                                           *
     ****************************************************************************/

    cvFactory.getUserData(function(user) {

        $scope.userProjects = user.userCV.projects; //array PROJECTS
        $scope.userTechnologies = user.userCV.technologies; //array USER TECHNOLOGIES

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

    /****************************************************************************
     *                                                                           *
     *                                Trashnyack                                 *
     *                                                                           *
     ****************************************************************************/

    $scope.submit = function(msg) {

        cvFactory.serSubmit(msg, $scope.userTechnologies, $scope.userCV, $scope.allCategories);
        $scope.technologyTypeShow = cvFactory.technologyTypeShow;
        if (!cvFactory.technologyTypeShow) {
            $scope.technologiesEnterText = '';
        }
    };

    $scope.enterProjectName = function($event, project) {
        if ($event.keyCode == 13) {
            $event.preventDefault();
            $scope.findProject(project);
        }
    };
    $scope.findProject = function(project) {
        
      
        cvFactory.findProject(project,$scope.allTechnologies, $scope.userProjects, $scope.userCV);
        if(typeof(project) == 'object'){
            $scope.projectName = project.name;
            angular.forEach(project.technologies, function(technology){
                if(typeof(technology) == 'object'){
                    $scope.technologiesInNewProject.push(technology);
                }
                angular.forEach($scope.allTechnologies, function(technolInArray){
                    if(technology == technolInArray.id){
                        $scope.technologiesInNewProject.push(technolInArray);

                    }
                });
                
            });
            // $scope.technologiesInNewProject = project.technologies;
            $scope.description =project.description;
            $scope.updateProjectId =project.id;
        }

    };
    $scope.enterTechnologyName = function($event, technology) {
      
        var count = true;
        if ($event.keyCode == 13) {
            $event.preventDefault();
            $scope.addtechnologiesInProject(technology);

        }

    };
    $scope.addtechnologiesInProject = function(technol) {
        if (technol !== '') {
            $scope.technologiesInNewProject.push(technol);
           
            $scope.technologiesInProject = '';
        }
    };
    $scope.cancel = function(){
        $scope.projectName = '';
        $scope.description = '';
        $scope.technologiesInNewProject = [];
        $scope.showProjectForm = false;
    };
    $scope.submitNewProject = function(description, projectNewName, startDate) {
        if(projectNewName !=='' && $scope.technologiesInNewProject !=='' && $scope.userProjects){
            
        cvFactory.submitNewProject(description, projectNewName, $scope.technologiesInNewProject, $scope.userProjects, $scope.userCV ,$scope.updateProjectId, $scope.startDate, $scope.allProjects);

        $scope.projectName = '';
        $scope.description = '';
        $scope.technologiesInNewProject = [];
        $scope.showProjectForm = false;
        }
        
    };

    $scope.selectTechCategory = function(category) {
        $scope.technology.category = JSON.parse(category);
    };

    $scope.updateCVTechnologies = function(obj){
        obj.stars = obj.stars.toString();
        cvFactory.updateCVTechnologies(obj, $scope.userCV);
    };


    $scope.selectTechnology = function(technology){
        var categoryId = technology.category;
        cvFactory.getTechCategory(categoryId, function(res) {
            ///some code
        })
    };

    /*$scope.addTechnology = function(technology) {
        ///some code
    };*/


    $scope.createTechnology = function(obj) {
        cvFactory.createTechnology(obj, $scope.userCV, function(res) {
            if(obj.stars) {
                res.stars = obj.stars;
            } else {
                res.stars = "1";
            }

            cvFactory.updateCVTechnologies(res, $scope.userCV, $scope.userTechnologies);
        });

        $scope.technology = {};
        $scope.techcategory = "";
    }

});
/****************************************************************************
 *                                                                           *
 *                              CUSTOM FILTERS                               *
 *                                                                           *
 ****************************************************************************/
angular.module('myApp').filter('uniqueTechnology', function() {
    return function(collection) {
        var output = [],
            isFind = false;

        angular.forEach(collection, function(item) {
            isFind = false;

            angular.forEach(output, function(outputItem) {
                if (item.category.id == outputItem.category.id) {
                    isFind = true;
                }
            });

            if (!isFind) {
                output.push(item);
            }
        });

        return output;
    };
});


angular.module('myApp').filter('ratingFilter', function() {
    return function(array, filtrRate) {

        var output = [];
        angular.forEach(array, function(item) {

            if ((item.stars >= filtrRate) || (filtrRate == 0)) {
                output.push(item);
            }

        });
        return output;
    };
});

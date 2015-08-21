angular.module('myApp').controller('technologiesCtrl', function($scope, technologies, cvFactory) {
    // $scope.listOfAllTechnologies = technologies.listOfAllTechnologies;
    // $scope.listOfAllCategories = technologies.listOfAllCategories;
    // $scope.technologies = technologies;
    /****************************************************************************
     *                                                                           *
     *                               SCOPE VARIABLE                              *
     *                                                                           *
     ****************************************************************************/

    $scope.userProjects = [];
    $scope.allProjects = [];
    $scope.userTechnologies = [];
    $scope.allCategories = [];
    $scope.max = 5;
    $scope.filtrRate = 0;
    $scope.projectName = '';
    $scope.technologiesInNewProject = [];
    $scope.updateProjectId = '';
    $scope.startDate = '';
     $scope.isCollapsed = true;
    // $scope.technologyTypeShow = false;
   

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

        cvFactory.serSubmit(msg, $scope.userTechnologies, $scope.userCV);
        $scope.technologyTypeShow = cvFactory.technologyTypeShow;
        if (!cvFactory.technologyTypeShow) {
            $scope.technologiesEnterText = '';
        }
    };
    $scope.submitOne = function(msg) {
        cvFactory.serSubmitOne(msg, $scope.userTechnologies, $scope.userCV, $scope.allTechnologies);
        $scope.technologyTypeEnterText = '';
        $scope.technologiesEnterText = '';
        // cvFactory.technologyTypeShow = false;
        $scope.technologyTypeShow = cvFactory.technologyTypeShow;
       

    };
    $scope.enterProjectName = function($event, project) {
        

       
        if ($event.keyCode == 13) {
            $scope.findProject(project);
        }
    };
    $scope.findProject = function(project) {
        
      
        cvFactory.findProject(project,$scope.allTechnologies, $scope.userProjects, $scope.userCV);
        $scope.showFieldNewProjects = cvFactory.showFieldNewProjects;
        if($scope.showFieldNewProjects && typeof(project) == 'object'){
            $scope.projectName = project.name;
            $scope.productowner = project.productowner;
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
        if(!$scope.showFieldNewProjects){
            $scope.projectName ='';
        }
    };
    $scope.enterTechnologyName = function($event, technology) {
      
        var count = true;
        if ($event.keyCode == 13) {

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
        $scope.productowner = '';
        $scope.description = '';
        $scope.technologiesInNewProject = [];
        $scope.showFieldNewProjects = false;
    };
    $scope.submitNewProject = function(productowner, description, projectNewName, startDate) {
        if(productowner !=='' && productowner !=='' && projectNewName !=='' && $scope.technologiesInNewProject !=='' && $scope.userProjects){
            
        cvFactory.submitNewProject(productowner, description, projectNewName, $scope.technologiesInNewProject, $scope.userProjects, $scope.userCV ,$scope.updateProjectId, $scope.startDate, $scope.allProjects);

        $scope.projectName = '';
        $scope.productowner = '';
        $scope.description = '';
        $scope.technologiesInNewProject = [];
        $scope.showFieldNewProjects = cvFactory.showFieldNewProjects;
        }
        
    };
    // $scope.addStars=function(stars){
    //     
    //     if(stars==6){
    //         stars=1;
    //     }else{
    //         stars++;
    //     }
    //     return stars;

    // };


    $scope.getColor = function(stars) {

        var color = 1;
        switch (stars) {
            case "1":
                color = "tehButton1Stars";
                break;
            case "2":
                color = "tehButton2Stars";
                break;
            case "3":
                color = "tehButton3Stars";
                break;
            case "4":
                color = "tehButton4Stars";
                break;
            case "5":
                color = "tehButton5Stars";
                break;
        }
        return color;
    };



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

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
    $scope.projectName='';
    $scope.technologiesInNewProject = [];
    // $scope.technologyTypeShow = false;
    // console.log($scope.technologyTypeShow);

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
     *                                Trashnyack                                  *
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
        cvFactory.technologyTypeShow = false;

    };
    $scope.enterProjectName = function($event){
        console.log($scope.projectName,'1111111111111111111111111');
        if ($event.keyCode == 13){
            $scope.findProject($scope.projectName);
        }
    };
    $scope.findProject = function (project){
        console.log(project,'222222222222222222222');
        $scope.showFieldNewProjects = cvFactory.showFieldNewProjects;
            cvFactory.findProject(project, $scope.allProjects, $scope.userProjects, $scope.userCV);
            $scope.projectName = '';
    }; 
    $scope.addtechnologiesInProject = function(technol){
        $scope.technologiesInNewProject.push(technol);
    };
   $scope.submitNewProject =function (productowner, description, projectNewName){

        cvFactory.submitNewProject (productowner, description, projectNewName, $scope.technologiesInNewProject);

        $scope.projectNewName = '';
        $scope.productowner = '';
        $scope.description = '';
        $scope.technologiesInNewProject=[];

   };
    // $scope.addStars=function(stars){
    //     
    //     if(stars==6){
    //         stars=1;
    //     }else{
    //         stars++;
    //     }
    //     console.log(stars,'2222');
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
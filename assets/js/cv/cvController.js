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
    $scope.userTechnologies = [];
    $scope.allCategories = [];
    $scope.max = 5;
    $scope.filtrRate = 0;
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
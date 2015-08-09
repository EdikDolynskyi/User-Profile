angular.module('myApp').service('technologies', function($resource){
    var technologies = {},
        baseCVPath = '/api/cvs',
        User = $resource('/api/users'),
        CV = $resource(baseCVPath),
        Categories = $resource('/api/categories'),
        Technology = $resource('/api/technologies');

    // =================================================================================================================
    technologies.technologiesMainList = Technology.query();
    technologies.categoriesMainList = Categories.query();
    technologies.technologiesList = [];
    technologies.technologyTypeShow = false;

    // =================================================================================================================
    technologies.user = User.get({id:"55c38b5a956240ba4c6a5f24"});
    technologies.user.$promise.then(function (resultUser) {
        technologies.user = resultUser;
        technologies.userCV = CV.get({id:technologies.user.userCV});
        technologies.userCV.$promise.then(function (resultCV) {
            technologies.userCV = resultCV;
            angular.forEach(technologies.userCV.tehcnologies, function(element) {
                technologies.technology = Technology.get({id:element});
                technologies.technology.$promise.then(function (resultTech) {
                    technologies.technologiesList.push(resultTech.name);
                });
            });
        });
    });

    // =================================================================================================================
    technologies.serSubmit = function(technologiesEnterText) {
        if (technologiesEnterText) {
            technologies.saveTechnology(technologiesEnterText);
        }
    };

    // =================================================================================================================
    technologies.saveTechnology = function(obj){
        var saveObj = {},
            isFind = false;

        angular.forEach(technologies.technologiesList, function(element) {
            if (element == obj.name) {
                isFind = true;
            }
        });

        if (!isFind) {
            if (obj.name == null) {
                // HERE WE MUST ADD TECH TO USER COLLECTION
                // BUT BEFORE SELECT CATEGORY FOR THIS TECH
                technologies.technologyTypeShow = true;
                //alert('DO YOU WANT ADD NEW TECH?');
                technologies.technologiesList.push(obj);
                //saveObj.name = obj;
                //Technology.save(saveObj, function (response) {
                //    technologies.technologiesMainList.push(response);
                //});
            } else {
                //HERE WE MUST ADD TECH TO USER COLLECTION
                technologies.userCV.tehcnologies.push(obj.id);
                saveObj = {};
                saveObj.tehcnologies = technologies.userCV.tehcnologies;
                var CVPost = $resource(baseCVPath+'/'+technologies.user.userCV);
                CVPost.save(saveObj, function (response) {
                    console.log(response);
                });
                technologies.technologiesList.push(obj.name);
            }
        }
    };

    // =================================================================================================================
    return technologies;
});
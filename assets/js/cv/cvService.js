angular.module('myApp').service('technologies', function($resource){
    var technologies = {},
        baseCVPath = '/api/cvs',
        baseTechPath = '/api/technologies',
        User = $resource('/api/users'),
        CV = $resource(baseCVPath),
        Categories = $resource('/api/categories'),
        Technology = $resource(baseTechPath);

    // =================================================================================================================
    technologies.technologiesMainList = Technology.query();
    technologies.categoriesMainList = Categories.query();
    technologies.technologiesList = [];
    technologies.categoriesList = [];
    technologies.technologyTypeShow = false;
    technologies.techName = '';

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
                    technologies.technologiesList.push(resultTech);
                    if (technologies.categoriesList.length == 0) {
                        technologies.category = Categories.get({id:resultTech.category});
                            technologies.category.$promise.then(function (resultCateg){
                                technologies.categoriesList.push(resultCateg);
                           
                            });
                    }
                    angular.forEach(technologies.categoriesList, function(elementCateg) {
                        console.log(elementCateg, 'aaaaaaaaa',  resultTech);
                        var isFind  = false;
                        if (elementCateg.id == resultTech.category) {
                            isFind = true;
                        };
                        if (!isFind) {
                            technologies.category = Categories.get({id:resultTech.category});
                            technologies.category.$promise.then(function (resultCateg){
                                technologies.categoriesList.push(resultCateg);
                           
                            });
                        };
                    });
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
     technologies.serSubmitOne = function(technologiesEnterTextOne) {
        if (technologiesEnterTextOne) {
            technologies.saveTechnologyOne(technologiesEnterTextOne);
        }
    };
 // =================================================================================================================
    technologies.saveTechnologyOne = function(obj){
        var saveObj = {},
            isFind = false;

        angular.forEach(technologies.categoriesMainList, function(element) {
            if (element == obj.name) {
                isFind = true;
            }
        });

        if (!isFind) {
            if (obj.name == null) {
                            
               
                saveObj = {}; 
                saveObj.name = obj;

                Categories.save(saveObj, function (response) {
                    technologies.categoriesMainList.push(response);
                    saveObj1 = {};
                    saveObj1.category = response.id;
                    saveObj1.name = technologies.techName;
                    var TechPost = $resource(baseTechPath);
                    TechPost.save(saveObj1, function (response1) {
                        technologies.userCV.tehcnologies.push(response1.id);
                        console.log(response1);
                        saveObj2 = {};
                        saveObj2.tehcnologies = technologies.userCV.tehcnologies;
                        var CVPost = $resource(baseCVPath+'/'+technologies.user.userCV);
                        CVPost.save(saveObj2, function (response2) {
                        console.log(response2);
                        technologies.technologiesList.push(response2);
                        });
                    });
                });
            } else {
                
                technologies.categoriesMainList.push(obj);
                    saveObj1 = {};
                    saveObj1.category = obj.id;
                    saveObj1.name = technologies.techName;
                    var TechPost = $resource(baseTechPath);
                    TechPost.save(saveObj1, function (response1) {
                        technologies.userCV.tehcnologies.push(response1.id);
                        console.log(response1);
                        saveObj2 = {};
                        saveObj2.tehcnologies = technologies.userCV.tehcnologies;
                        var CVPost = $resource(baseCVPath+'/'+technologies.user.userCV);
                        CVPost.save(saveObj2, function (response2) {
                        console.log(response2);
                        technologies.technologiesList.push(response2);
                        });
                    });
            }
        }
    };
    // =================================================================================================================
    technologies.saveTechnology = function(obj){
        var saveObj = {},
            isFind = false;

        angular.forEach(technologies.technologiesList, function(element) {
            if (element.name == obj.name) {
                isFind = true;
            }
        });

        if (!isFind) {
            if (obj.name == null) {
                // HERE WE MUST ADD TECH TO USER COLLECTION
                // BUT BEFORE SELECT CATEGORY FOR THIS TECH
                technologies.technologyTypeShow = true;
                technologies.techName = obj;
                //alert('DO YOU WANT ADD NEW TECH?');
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
                technologies.technologiesList.push(obj);
            }
        }
    };

    // =================================================================================================================
    return technologies;
});
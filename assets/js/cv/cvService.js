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
    // Получаем юзера
    technologies.user = User.get({id:"55c38b5a956240ba4c6a5f24"});
    technologies.user.$promise.then(function (resultUser) {
        technologies.user = resultUser;
        // получаем CV юзера
        technologies.userCV = CV.get({id:technologies.user.userCV});
        technologies.userCV.$promise.then(function (resultCV) {
            technologies.userCV = resultCV;

            angular.forEach(technologies.userCV.tehcnologies, function(element) {
                // получаем технологии юзера
                technologies.technology = Technology.get({id:element});
                technologies.technology.$promise.then(function (resultTech) {
                    technologies.technologiesList.push(resultTech);
                    // получаем категории технологии
                    technologies.category = Categories.get({id:resultTech.category});
                    technologies.category.$promise.then(function (resultCategory){
                        var isFind  = false;
                        angular.forEach(technologies.categoriesList, function(elementCategory) {
                            if (elementCategory.id == resultTech.category) {
                                isFind = true;
                            };
                        });

                        if (!isFind) {
                            technologies.categoriesList.push(resultCategory);
                        };
                    });
                }).catch(function(err){console.log("123",err)});
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
                    technologies.categoriesList.push(response);
                    saveObj1 = {};
                    saveObj1.category = response.id;
                    saveObj1.name = technologies.techName;
                    var TechPost = $resource(baseTechPath);
                    TechPost.save(saveObj1, function (response1) {
                        technologies.userCV.tehcnologies.push(response1.id);
                        technologies.technologiesList.push(response1);
                        //console.log(111,response1);
                        saveObj2 = {};
                        saveObj2.tehcnologies = technologies.userCV.tehcnologies;
                        var CVPost = $resource(baseCVPath+'/'+technologies.user.userCV);
                        CVPost.save(saveObj2, function (response2) {
                            //console.log(222,response2);
                        });
                    });
                });
                technologies.technologyTypeShow = false;
            } else {
                //technologies.categoriesMainList.push(obj);
                saveObj1 = {};
                saveObj1.category = obj.id;
                saveObj1.name = technologies.techName;
                var TechPost = $resource(baseTechPath);
                TechPost.save(saveObj1, function (response1) {
                    technologies.userCV.tehcnologies.push(response1.id);
                    technologies.technologiesList.push(response1);
                    console.log(111,response1);
                    saveObj2 = {};
                    saveObj2.tehcnologies = technologies.userCV.tehcnologies;
                    var CVPost = $resource(baseCVPath+'/'+technologies.user.userCV);
                    CVPost.save(saveObj2, function (response2) {
                        console.log(222,response2);
                    });
                });
                technologies.technologyTypeShow = false;
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
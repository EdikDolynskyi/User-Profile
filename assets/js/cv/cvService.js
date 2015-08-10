angular.module('myApp').service('technologies', function($resource){
    var T = {},
        baseCVPath = '/api/cvs',
        baseTechPath = '/api/technologies',
        User = $resource('/api/users'),
        CV = $resource(baseCVPath),
        Categories = $resource('/api/categories'),
        Technology = $resource(baseTechPath);

    // =================================================================================================================
    T.listOfAllTechnologies = Technology.query();
    T.listOfAllCategories = Categories.query();
    T.listOfUserTechnologies = [];
    T.categoriesList = [];
    T.technologyTypeShow = false;
    T.techName = '';

    // =================================================================================================================
    // Получаем юзера
    T.user = User.get({id:"55c38b5a956240ba4c6a5f24"});
    T.user.$promise.then(function (resultUser) {
        T.user = resultUser;
        // получаем CV юзера
        T.userCV = CV.get({id:T.user.userCV});
        T.userCV.$promise.then(function (resultCV) {
            T.userCV = resultCV;

            angular.forEach(T.userCV.tehcnologies, function(element) {
                // получаем технологии юзера
                T.technology = Technology.get({id:element});
                T.technology.$promise.then(function (resultTech) {
                    T.listOfUserTechnologies.push(resultTech);
                    // получаем категории технологии
                    T.category = Categories.get({id:resultTech.category});
                    T.category.$promise.then(function (resultCategory){
                        var isFind  = false;
                        angular.forEach(T.categoriesList, function(elementCategory) {
                            if (elementCategory.id == resultTech.category) {
                                isFind = true;
                            };
                        });

                        if (!isFind) {
                            T.categoriesList.push(resultCategory);
                        };
                    });
                }).catch(function(err){console.log("123",err)});
            });
        });
    });

    // =================================================================================================================
    T.serSubmit = function(technologiesEnterText) {
        if (technologiesEnterText) {
            T.saveTechnology(technologiesEnterText);
        }
    };
    // =================================================================================================================
     T.serSubmitOne = function(technologiesEnterTextOne) {
        if (technologiesEnterTextOne) {
            T.saveTechnologyOne(technologiesEnterTextOne);
        }
    };
 // =================================================================================================================
    T.saveTechnologyOne = function(obj){
        var saveObj = {},
            isFind = false;

        angular.forEach(T.listOfAllCategories, function(element) {
            if (element == obj.name) {
                isFind = true;
            }
        });

        if (!isFind) {
            if (obj.name == null) {
                saveObj = {};
                saveObj.name = obj;

                Categories.save(saveObj, function (response) {
                    T.listOfAllCategories.push(response);
                    T.categoriesList.push(response);
                    saveObj1 = {};
                    saveObj1.category = response.id;
                    saveObj1.name = T.techName;
                    var TechPost = $resource(baseTechPath);
                    TechPost.save(saveObj1, function (response1) {
                        T.userCV.tehcnologies.push(response1.id);
                        T.listOfUserTechnologies.push(response1);
                        //console.log(111,response1);
                        saveObj2 = {};
                        saveObj2.tehcnologies = T.userCV.tehcnologies;
                        var CVPost = $resource(baseCVPath+'/'+T.user.userCV);
                        CVPost.save(saveObj2, function (response2) {
                            //console.log(222,response2);
                        });
                    });
                });
                T.technologyTypeShow = false;
            } else {
                saveObj1 = {};
                saveObj1.category = obj.id;
                saveObj1.name = T.techName;
                var TechPost = $resource(baseTechPath);
                TechPost.save(saveObj1, function (response1) {
                    T.userCV.tehcnologies.push(response1.id);
                    T.listOfUserTechnologies.push(response1);
                    console.log(111,response1);
                    saveObj2 = {};
                    saveObj2.tehcnologies = T.userCV.tehcnologies;
                    var CVPost = $resource(baseCVPath+'/'+T.user.userCV);
                    CVPost.save(saveObj2, function (response2) {
                        console.log(222,response2);
                    });
                });
                T.technologyTypeShow = false;
            }
        }
    };
    // =================================================================================================================
    T.saveTechnology = function(obj){
        var saveObj = {},
            isFind = false;

        angular.forEach(T.listOfUserTechnologies, function(element) {
            if (element.name == obj.name) {
                isFind = true;
            }
        });

        if (!isFind) {
            if (obj.name == null) {
                // HERE WE MUST ADD TECH TO USER COLLECTION
                // BUT BEFORE SELECT CATEGORY FOR THIS TECH
                T.technologyTypeShow = true;
                T.techName = obj;
            } else {
                //HERE WE MUST ADD TECH TO USER COLLECTION
                var isFindCategory  = false;
                angular.forEach(T.categoriesList, function(elementCategory) {
                    if (elementCategory.id == obj.category) {
                        isFindCategory = true;
                    };
                });

                if (!isFindCategory) {
                    // получаем категории технологии
                    T.category = Categories.get({id:obj.category});
                    T.category.$promise.then(function (resultCategory){
                        T.categoriesList.push(resultCategory);
                    });
                };

                T.userCV.tehcnologies.push(obj.id);
                T.listOfUserTechnologies.push(obj);
                saveObj = {};
                saveObj.tehcnologies = T.userCV.tehcnologies;
                var CVPost = $resource(baseCVPath+'/'+T.user.userCV);
                CVPost.save(saveObj, function (response) {
                    console.log(response);
                });
            }
        }
    };

    // =================================================================================================================
    return T;
});
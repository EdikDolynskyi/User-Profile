angular.module('myApp').factory('cvFactory', function($resource) {


    var userId = '55c38b5a956240ba4c6a5f24';
    var cv = $resource('api/cvs/' + userId);
    var categories = $resource('api/categories');
    var technologies = $resource('api/technologies');
    var projects = $resource('api/projects');
    var F = {};
    var baseCVPath = '/api/cvs';
    var CategoriesRes = $resource('api/categories');
    var TechnologiesRes = $resource('api/technologies');

    F.getUserData = function(callback) {
        cv.get(function(resultUser) {

            callback(resultUser);
        });


    };
    F.getAllProjects = function(callback) {
        projects.query(function(result) {
            callback(result);
        });
    };
    F.getAllCategories = function(callback) {
        categories.query(function(result) {
            callback(result);
        });
    };
    F.getAllTechnologies = function(callback) {
        technologies.query(function(result) {
            callback(result);
        });
    };

    F.serSubmit = function(technologiesEnterText, userTechnogies, userCV) {

        if (technologiesEnterText) {
            saveTechnology(technologiesEnterText, userTechnogies, userCV);
        }

    };
    F.findProject = function(project, allProjects,userProjects, userCV){
      console.log(project,'3333333333333333333333333');
      var isFindInCv = false;
      var dublicate =false;
      
      angular.forEach(allProjects,function(projectInDb){
        if (projectInDb.id == project.id) {
          isFindInCv=true;
        }
      angular.forEach(userProjects, function(userProject){
        if(project.id == userProject.id){
          dublicate=true;
        }
        
      });

        if(isFindInCv && !dublicate){
          userProjects.push(project);
          console.log(userProjects);
          var updateCv = {};
          updateCv.projects =[];
          angular.forEach (userProjects, function(proj){
            updateCv.projects.push(proj.id);
             var CVPost = $resource(baseCVPath + '/' + userCV.id);
                    CVPost.save(updateCv, function() {});

          });

        }else if(!isFindInCv){
          F.showFieldNewProjects = true;

        }else if(dublicate){
          F.showFieldNewProjects = true;

        }
      });
    };
    F.submitNewProject  = function (productowner, description, projectNewName, technologies){
      newProject = {};
      newProject.name = projectNewName;
      newProject.productowner =productowner;
      newProject.technologies =technologies;
      newProject.description = description;
      console.log(newProject);
    };
    // =================================================================================================================
    F.serSubmitOne = function(technologiesEnterTextOne, userTechnogies, userCV, allTechnologies) {
        if (technologiesEnterTextOne) {
            saveTechnologyOne(technologiesEnterTextOne, userTechnogies, userCV, allTechnologies);
        }
    };
    // =================================================================================================================
    
    var saveTechnologyOne = function(obj, userTechnogies, userCV, allTechnologies) {


        var isFind = false;

        angular.forEach(allTechnologies, function(element) {
            if (element.category.name == obj.name) {
                console.log(obj.name);
                isFind = true;
                console.log(isFind);
            }

        });

        if (!isFind) {


            categorySaveObject = {};
            categorySaveObject.name = obj;

            CategoriesRes.save(categorySaveObject, function(response) {

                technologySaveObject = {};
                technologySaveObject.category = response.id;
                technologySaveObject.name = F.techName;



                TechnologiesRes.save(technologySaveObject, function(responseTechnologies) {
                    technologySaveObject.id = responseTechnologies.id;

                    technologySaveObject.category = response;
                    technologySaveObject.stars = '1';

                    userTechnogies.push(technologySaveObject);

                    postTechnologyToUserCv = {};
                    postTechnologyToUserCv.technologies = [];
                    angular.forEach(userTechnogies, function(technology) {
                        newObj = {};
                        newObj.userTech = technology.id;
                        if (technology.stars == null) {
                            newObj.stars = "1";
                        } else {
                            newObj.stars = technology.stars;
                        }
                        postTechnologyToUserCv.technologies.push(newObj);
                    });
                    var CVPost = $resource(baseCVPath + '/' + userCV.id);
                    CVPost.save(postTechnologyToUserCv, function(response2) {

                        F.technologyTypeShow = false;
                    });

                });





            });
            F.technologyTypeShow = false;

        } else {

            technologySaveObject = {};
            console.log(obj);
            technologySaveObject.category = obj.id;
            technologySaveObject.name = F.techName;

            TechnologiesRes.save(technologySaveObject, function(response) {
                technologySaveObject.id = response.id;
                technologySaveObject.stars = '1';


                technologySaveObject.category = obj;

                userTechnogies.push(technologySaveObject);


                postTechnologyToUserCv = {};
                postTechnologyToUserCv.technologies = [];
                angular.forEach(userTechnogies, function(technology) {
                    newObj = {};
                    newObj.userTech = technology.id;
                    if (technology.stars == null) {
                        newObj.stars = "1";
                    } else {
                        newObj.stars = technology.stars;
                    }
                    postTechnologyToUserCv.technologies.push(newObj);
                });
                var CVPost = $resource(baseCVPath + '/' + userCV.id);
                CVPost.save(postTechnologyToUserCv, function(response2) {

                    F.technologyTypeShow = false;
                });






            });

        }
        // }
    };
    // =================================================================================================================
    var saveTechnology = function(obj, userTechnogies, userCV) {
        var saveObj = {},
            isFind = false;



        angular.forEach(userTechnogies, function(element) {

            if (element.category.name == obj.name) {
                isFind = true;

            }
        });

        if (!isFind) {
            if (obj.name == null) {

                F.technologyTypeShow = true;
                F.techName = obj;
            } else {

                obj.stars = "1";
                userTechnogies.push(obj);



                saveObj = {};
                saveObj.technologies = [];
                angular.forEach(userTechnogies, function(technology) {
                    var objElement = {};
                    objElement.userTech = technology.id;


                    if (technology.stars == null) {
                        objElement.stars = "1";
                    } else {
                        objElement.stars = technology.stars;
                    }
                    saveObj.technologies.push(objElement);

                });

                var CVPost = $resource(baseCVPath + '/' + userCV.id);
                CVPost.save(saveObj, function(response) {

                });
            }
        }
    };

    return F;

});
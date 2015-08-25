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

    F.serSubmit = function(technologiesEnterText, userTechnologies, userCV, allCategories) {

        if (technologiesEnterText) {
            saveTechnology(technologiesEnterText, userTechnologies, userCV, allCategories);
        }

    };
    F.findProject = function(project, allTechnologies, userProjects, userCV) {

        var isDublicate = false;
        var isNewProject = false;
        if (typeof(project) == 'object') {
            angular.forEach(userProjects, function(projectInArray) {
                if (project.id == projectInArray.id) {
                    isDublicate = true;
                }
            });
        } else {
            isNewProject = true;
        }
        if (!isDublicate && project !== '' && !isNewProject) {
            arrayTechnologies = [];
            angular.forEach(project.technologies, function(technologyOfProject) {
                angular.forEach(allTechnologies, function(technologyFromArray) {
                    if (technologyOfProject == technologyFromArray.id) {
                        arrayTechnologies.push(technologyFromArray);
                    }

                });
            });
            project.technologies = arrayTechnologies;
            addProjectTime = new Date();
            project.startUserOnProject = addProjectTime;
            userProjects.push(project);
            var addProjectInProjectColection = {};
            addProjectInProjectColection.projects = [];
            angular.forEach(userProjects, function(projectInUserCV) {
              objUserProject = {};
                objUserProject.projectId = projectInUserCV.id;
                objUserProject.startUserOnProject = projectInUserCV.startUserOnProject;
                addProjectInProjectColection.projects.push(objUserProject);
              
            });
            var CVPost = $resource(baseCVPath + '/' + userCV.id);
            CVPost.save(addProjectInProjectColection, function(response2) {});

        } else {
            F.showFieldNewProjects = true;


        }

    };
    var submitUpdateProject = function(description, projectNewName, technologies, userProjects, userCV, updateProjectId, startDate, allProjects) {
        var updateProject = {};
        var updateProjectToServer = {};
        var technologiesArray = [];
        updateProject.name = projectNewName;
        updateProject.technologies = technologies;
        updateProject.description = description;
        updateProject.id = updateProjectId;
        updateProject.startUserOnProject = startDate;
        angular.forEach(userProjects, function(project, i) {
            if (project.id == updateProject.id) {
                userProjects[i] = updateProject;
            }
        });
        angular.forEach(allProjects, function(project, i) {
            if (project.id == updateProject.id) {
                allProjects[i] = updateProject;
            }
        });
        updateProjectToServer.name = projectNewName;
        updateProjectToServer.technologies = [];
        updateProjectToServer.description = description;
        updateProjectToServer.id = updateProjectId;
        angular.forEach(technologies, function(technology) {
            technologiesArray.push(technology.id);
        });
        updateProjectToServer.technologies = technologiesArray;
        var projectPost = $resource('api/projects/' + updateProjectId);
        projectPost.save(updateProjectToServer, function(response2) {});
        updateProjectToUserCv = {};
        updateProjectToUserCv.projects = [];
        angular.forEach(userProjects, function(oneProjects) {
                updateOneProject={};
                updateOneProject.projectId = oneProjects.id;
                updateOneProject.startUserOnProject = oneProjects.startUserOnProject;
                updateProjectToUserCv.projects.push(updateOneProject);
        });
        var CVPost = $resource(baseCVPath + '/' + userCV.id);
                CVPost.save(updateProjectToUserCv, function(response2) {});
    };
    F.submitNewProject = function( description, projectNewName, technologies, userProjects, userCV, updateProjectId, startDate, allProjects) {
        if (!updateProjectId || updateProjectId == '') {
            var newProject = {};
            var newProjectToServer = {};
            var newProjectToUserCv = {};
            newProjectToUserCv.projects = [];
            var technologiesArray = [];
            newProject.name = projectNewName;
            newProject.technologies = technologies;
            newProject.description = description;
            allProjects.push(newProject);
            if(!startDate && startDate ==''){
              startDate = new Date();
            }
            newProject.startUserOnProject = startDate;
            userProjects.push(newProject);
            newProjectToServer.name = projectNewName;
            newProjectToServer.technologies = [];
            newProjectToServer.description = description;
            angular.forEach(technologies, function(technology) {
                technologiesArray.push(technology.id);
            });
            angular.forEach(userProjects, function(userProject) {
                if (userProject.id) {
                  var projObj = {};
                  projObj.startUserOnProject = userProject.startUserOnProject;
                  projObj.projectId = userProject.id;
                    newProjectToUserCv.projects.push(projObj);
                }
            });
            newProjectToServer.technologies = technologiesArray;
            projects.save(newProjectToServer, function(response) {
                var projObj = {};
                projObj.projectId = response.id;
                projObj.startUserOnProject  = startDate ;
                newProjectToUserCv.projects.push(projObj);
                var CVPost = $resource(baseCVPath + '/' + userCV.id);
                CVPost.save(newProjectToUserCv, function(response2) {});
            });
            //F.showFieldNewProjects = false;
        } /*else {
            submitUpdateProject(productowner, description, projectNewName, technologies, userProjects, userCV, updateProjectId, startDate, allProjects);
            F.showFieldNewProjects = false;
        }*/
    };
    // =================================================================================================================
    F.serSubmitOne = function(technologiesEnterTextOne, userTechnogies, userCV, allTechnologies) {
        if (technologiesEnterTextOne) {
            saveTechnologyOne(technologiesEnterTextOne, userTechnogies, userCV, allTechnologies);
        }
    };

    F.updateCVTechnologies = function(obj, userCV, userTechnologies){
        $resource('/updatetechnologies/:id', {id: '@id'}, {'update': { method:'PUT' }})
        .update({id: userCV.id}, obj);

        if(userTechnologies) {
            var newTechnology = {};
            var Technologies = $resource('api/technologies', {id: '@id'});
            Technologies.get({id: obj.userTech}, function(technology) {
                newTechnology = technology;
                newTechnology.stars = obj.stars;

                var Categories = $resource('api/categories', {id: '@id'});
                Categories.get({id: newTechnology.category}, function(category) {
                    newTechnology.category = category;
                    userTechnologies.push(newTechnology);
                });
            });
        }

    };

    F.createTechnology = function(obj, userCV, callback){
        var newTechnology = {};
        newTechnology.name = obj.name;
        newTechnology.category = obj.category.id;

        var Technologies = $resource('api/technologies', null, {'post': { method:'POST' }});
        Technologies.post(newTechnology, function(res){
            newTechnology = {userTech: res.id};

            callback(newTechnology);
        });

    };

    /*F.getTechCategory = function(techId, callback){
        var Categories = $resource('api/categories', {id: '@id'});
        Categories.get({id: techId}, function(category) {
            callback(category);
        });
    };*/
    // =================================================================================================================

    var saveTechnologyOne = function(obj, userTechnogies, userCV, allTechnologies) {
        var isFind = false;
        angular.forEach(allTechnologies, function(element) {
            if (element.category.name == obj.name) {
                isFind = true;
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
    };
    // =================================================================================================================
    var saveTechnology = function(obj, userTechnogies, userCV, allCategories) {
        var saveObj = {},
            isFind = false,
            dubl = false;

        angular.forEach(userTechnogies, function(validTechnology) {
            if (obj.id == validTechnology.id) {
                dubl = true;
            }
        });
        angular.forEach(userTechnogies, function(element) {
            if (element.category.name == obj.name) {
                isFind = true;
            }
        });
        if (!isFind && !dubl) {
            if (obj.name == null) {
                F.technologyTypeShow = true;
                F.techName = obj;
            } else {
                obj.stars = "1";
                angular.forEach(allCategories, function(category){
                    if(category.id == obj.category){
                        obj.category = category;
                    }

                });
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
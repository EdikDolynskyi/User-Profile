var app = require('../angular-app');

app.factory('cvFactory', function($resource) {

    var userId = '55c38b5a956240ba4c6a5f24';
    var cv = $resource('api/cvs/' + userId);
    var Technologies = $resource('api/technologies');
    var Projects = $resource('api/projects');
    var Categories = $resource('api/categories');
    var Users_projects = $resource('api/users_projects');
    var F = {};

    F.getUserData = function(callback) {
        cv.get(function(res) {
            callback(res);
        });
    };

    F.getAllProjects = function(callback) {
        Projects.query(function(res) {
            callback(res);
        });
    };

    F.getAllCategories = function(callback) {
        Categories.query(function(res) {
            callback(res);
        });
    };

    F.getAllTechnologies = function(callback) {
        Technologies.query(function(res) {
            callback(res);
        });
    };

    F.getUserProjects = function(callback) {
        $resource('/users_projects/:user_id', {user_id: '@id'})
            .query({user_id: userId}, function(res) {
                callback(res);
            });
    };

    F.createTechnology = function(tech, userCV, callback){
        var newTechnology = {};
        newTechnology.name = tech.name;
        newTechnology.category = tech.category.id;

        Technologies.save(newTechnology, function(res){
            callback(res);
        });

    };

    F.addTechnologyToCV = function(tech, userCV, callback) {
        var CVs = $resource('/cv/:cv_id/technology/:id', {cv_id: '@id', id: '@id'});
        CVs.save({cv_id: userCV.id, id: tech.id}, tech);

        var Categories = $resource('api/categories', {id: '@id'});
        Categories.get({id: tech.category}, function(res) {
            tech.category = res;

            callback(tech);
        })
    };

    F.updateCVTechnologies = function(tech, userCV){
        var CVs = $resource('/cv/:cv_id/technology/:id', {cv_id: '@id', id: '@id'}, {'update': { method:'PUT' }});
        CVs.update({cv_id: userCV.id, id: tech.id}, tech);
    };

    F.getProject = function(id, callback) {
        var Users_projects = $resource('api/users_projects/:id', {id: '@id'});
        Users_projects.get({id: id}, function(res) {
            callback(res);
        })
    };

    F.createProject = function(project, userRole, startDate, endDate, callback) {
        var newProject = {};
        newProject.name = project.name;
        newProject.description = project.description;
        newProject.technologies = [];
        newProject.start = project.start;
        newProject.end = project.end || "";

        for(var i=0; i< project.technologies.length; i++){
            newProject.technologies.push(project.technologies[i].id);
        }

        Projects.save(newProject, function(project){
            var newUsers_ProjectsObj = {};
            newUsers_ProjectsObj.user = userId;
            newUsers_ProjectsObj.project = project.id;
            newUsers_ProjectsObj.userRole = userRole;
            newUsers_ProjectsObj.start = startDate;
            newUsers_ProjectsObj.end = endDate;

            Users_projects.save(newUsers_ProjectsObj, function(res){
                callback(res.id);
            })

        });


    };

    F.selectProject = function(project, userRole, startDate, endDate, callback) {
        var newUsers_ProjectsObj = {};
        newUsers_ProjectsObj.user = userId;
        newUsers_ProjectsObj.project = project.id;
        newUsers_ProjectsObj.userRole = userRole;
        newUsers_ProjectsObj.start = startDate;
        newUsers_ProjectsObj.end = endDate;

        Users_projects.save(newUsers_ProjectsObj, function(res){
            callback(res.id);
        });
    };

    return F;

});
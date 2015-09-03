var app = require('../angular-app');

app.factory('cvPublicFactory', function($resource, $rootScope) {

    var prefix = window.location.pathname;

    var userId = $rootScope.ownerId;
    var cv = $resource(prefix + 'api/cvs/' + userId);
    var Technologies = $resource(prefix + 'api/technologies');
    var Projects = $resource(prefix + 'api/projects');
    var Categories = $resource(prefix + 'api/categories');
    var Users_projects = $resource(prefix + 'api/users_projects');

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

    F.createTechnology = function(tech, cvId, callback){
        var newTechnology = {};
        newTechnology.name = tech.name;
        newTechnology.category = tech.category;

        Technologies.save(newTechnology, function(res){
            console.log(res.id);
            var cvTech = {};
            cvTech.id = res.id;
            cvTech.stars = tech.stars || 1;

            var CVs = $resource('/cv/:cv_id/technology', {cv_id: '@id'});
            CVs.save({cv_id: cvId}, cvTech, function(res){
                callback(res.id);
            });
        });

    };


    F.selectTechnology = function(tech, cvId, callback) {
        tech.stars = tech.stars || 1;

        var CVs = $resource(prefix + 'cv/:cv_id/technology', {cv_id: '@id', id: '@id'});
        CVs.save({cv_id: cvId}, tech, function(res){
            callback(res.id);
        });
    };

    F.getTechnology = function(tech_id, callback) {
        var Technologies = $resource(prefix + 'api/technologies/:id', {id: '@id'});
        Technologies.get({id: tech_id}, function(res) {
            callback(res);
        })
    };

    F.updateCVTechnology = function(tech, cvId){
        var CVs = $resource(prefix + 'cv/:cv_id/technology/:id', {cv_id: '@id', id: '@id'}, {'update': { method:'PUT' }});
        CVs.update({cv_id: cvId, id: tech.id}, tech);
    };

    F.getProject = function(id, callback) {
        var Users_projects = $resource(prefix + 'api/users_projects/:id', {id: '@id'});
        Users_projects.get({id: id}, function(res) {
            callback(res);
        })
    };

    F.createProject = function(project, callback) {
        var newProject = {};
        newProject.name = project.name;
        newProject.description = project.description;
        newProject.technologies = [];
        newProject.start = project.start;
        newProject.end = project.end;

        for(var i=0; i< project.technologies.length; i++){
            newProject.technologies.push(project.technologies[i].id);
        }

        Projects.save(newProject, function(res){
            var newUsers_ProjectsObj = {};
            newUsers_ProjectsObj.user = userId;
            newUsers_ProjectsObj.project = res.id;
            newUsers_ProjectsObj.userRole = project.userRole;
            newUsers_ProjectsObj.start = project.startDate;
            newUsers_ProjectsObj.end = project.endDate;

            Users_projects.save(newUsers_ProjectsObj, function(res){
                callback(res.id);
            })

        });


    };

    F.selectProject = function(project, callback) {
        var newUsers_ProjectsObj = {};
        newUsers_ProjectsObj.user = userId;
        newUsers_ProjectsObj.project = project.id;
        newUsers_ProjectsObj.userRole = project.userRole;
        newUsers_ProjectsObj.start = project.startDate;
        newUsers_ProjectsObj.end = project.endDate;

        Users_projects.save(newUsers_ProjectsObj, function(res){
            callback(res.id);
        });
    };


    F.removeProject = function(project, callback) {
        var Users_projects = $resource(prefix + 'api/users_projects/:id', {id: '@id'});
        Users_projects.delete({id: project._id}, function(){
            callback(null);
        })
    };

    F.removeTechnology = function(tech, cvId, callback) {
        var CVs = $resource(prefix + 'cv/:cv_id/technology', {cv_id: '@id'}, {'update': { method:'PUT' }});
        CVs.update({cv_id: cvId}, tech, function(){
            callback(null);
        });
    };

    return F;

});
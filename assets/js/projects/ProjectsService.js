var app = require('../angular-app');

app.factory('ProjectsFactory', function($resource, $rootScope, prefix) {

    var Technologies = $resource(prefix + 'api/technologies');
    var Projects = $resource(prefix + 'api/projects');
    var Categories = $resource(prefix + 'api/categories');
    var Users_projects = $resource(prefix + 'api/users_projects');

    var F = {};

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

    // F.getUserProjects = function(callback) {
    //     $resource('/users_projects/:user_id', {user_id: '@id'})
    //         .query({user_id: userId}, function(res) {
    //             callback(res);
    //         });
    // };

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


    F.getProject = function(projectId, callback) {
        var Users_projects = $resource(prefix + 'api/projects/:id', {id: '@id'});
        Users_projects.get({id: projectId}, function(res) {
            callback(res);
        })
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

    return F;

});
var app = require('../angular-app');

app.factory('cvFactory', function($resource, $rootScope) {

    var prefix = window.location.pathname;
    var userId = $rootScope.ownerId;
    var F = {};

    F.getUserData = function(callback) {
        var CVs = $resource(prefix + 'api/cvs/:cv_id', {cv_id: '@id'});
        var cv = CVs.get({cv_id: userId}, function(res) {
            callback(res);
        });
    };

    F.getAllProjects = function(callback) {
        var Projects = $resource(prefix + 'api/projects');
        var projects = Projects.query(function(res) {
            callback(res);
        });
    };

    F.getAllCategories = function(callback) {
        var Categories = $resource(prefix + 'api/categories');
        var categories = Categories.query(function(res) {
            callback(res);
        });
    };

    F.getAllTechnologies = function(callback) {
        var Technologies = $resource(prefix + 'api/technologies');
        var technologies = Technologies.query(function(res) {
            callback(res);
        });
    };

    F.getUserProjects = function(callback) {
        var Users_projects = $resource('/users_projects/:user_id', {user_id: '@id'});
        var users_projects = Users_projects.query({user_id: userId}, function(res) {
            for(var i =0; i < res.length; i++) {
                res[i].start = new Date(res[i].start);
                res[i].startDate = new Date(res[i].startDate);
                res[i].end = new Date(res[i].end);

                if(res[i].endDate !== null) {
                    res[i].endDate = new Date(res[i].endDate);
                }
            }
            callback(res);
        });
    };

    F.createTechnology = function(obj, cvId, callback){
        var technology = {};
        technology.name = obj.name;
        technology.category = obj.category;

        var Technologies = $resource(prefix + 'api/technologies');
        Technologies.save(technology, function(res){
            var cvTech = {};
            cvTech.id = res.id;
            cvTech.stars = obj.stars;

            var CVs = $resource('/cv/:cv_id/technology', {cv_id: '@id'});
            CVs.save({cv_id: cvId}, cvTech, function(res){
                callback(res.id);
            });
        });

    };

    F.selectTechnology = function(technology, cvId, callback) {
        var CVs = $resource(prefix + 'cv/:cv_id/technology', {cv_id: '@id'});
        CVs.save({cv_id: cvId}, technology, function(res){
            callback(res.id);
        });
    };

    F.getTechnology = function(cvId, techId, callback) {
        var CVs = $resource(prefix + 'cv/:cv_id/technology/:id', {cv_id: '@id', id: '@id'});
        CVs.get({cv_id: cvId, id: techId}, function(res){
            callback(res);
        });
    };

    F.updateCVTechnology = function(technology, cvId){
        var CVs = $resource(prefix + 'cv/:cv_id/technology/:id', {cv_id: '@id', id: '@id'}, {'update': { method:'PUT' }});
        CVs.update({cv_id: cvId, id: technology.id}, technology);
    };

    F.getProject = function(id, callback) {
        var Users_projects = $resource(prefix + 'projects/:id', {id: '@id'});
        var project = Users_projects.get({id: id}, function(res) {
            callback(res);
        })
    };


    F.createProject = function(project, callback) {
        var Projects = $resource(prefix + 'projects', {}, {'post': { method:'POST' }});
        Projects.post({}, {project: project, userId: userId}, function(res){
            callback(res.id);
        });
    };

    F.selectProject = function(obj, callback) {
        var userProject = {};
        userProject.user = userId;
        userProject.project = obj.id;
        userProject.userRole = obj.userRole;
        userProject.start = obj.startDate;
        userProject.end = obj.endDate;

        var Users_projects = $resource(prefix + 'api/users_projects');
        Users_projects.save(userProject, function(res){
            callback(res.id);
        });

        if(obj.current) {
            var project = {id: obj.id};
            var Users = $resource(prefix + 'users/:id/currentproject', {id: '@id'}, {'update': {method: 'PUT'}});
            Users.update({id: userId}, project)
        }
    };


    F.removeProject = function(project, callback) {
        var Users_projects = $resource(prefix + 'api/users_projects/:id', {id: '@id'});
        Users_projects.delete({id: project._id}, callback)
    };

    F.removeTechnology = function(technology, cvId, callback) {
        var CVs = $resource(prefix + 'cv/:cv_id/technology', {cv_id: '@id'}, {'update': { method:'PUT' }});
        CVs.update({cv_id: cvId}, technology, callback);
    };

    F.updateProject = function(project){
        var users_projects = {};
        users_projects.user = userId;
        users_projects.project = project.id;
        users_projects.userRole = project.userRole;
        users_projects.start = project.startDate;
        users_projects.end = project.endDate;
        users_projects.current = project.current;

        var Users_projects = $resource(prefix + 'users_projects/:id', {id: '@id'}, {'update': { method:'PUT' }});
        Users_projects.update({id: project._id}, users_projects);

    };

    return F;

});
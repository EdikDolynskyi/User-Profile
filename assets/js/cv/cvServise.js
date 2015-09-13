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
            cvTech.stars = obj.stars || 1;

            var CVs = $resource('/cv/:cv_id/technology', {cv_id: '@id'});
            CVs.save({cv_id: cvId}, cvTech, function(res){
                callback(res.id);
            });
        });

    };

    F.selectTechnology = function(technology, cvId, callback) {
        technology.stars = technology.stars || 1;

        var CVs = $resource(prefix + 'cv/:cv_id/technology', {cv_id: '@id', id: '@id'});
        CVs.save({cv_id: cvId}, technology, function(res){
            callback(res.id);
        });
    };

    F.getTechnology = function(tech_id, callback) {
        var Technologies = $resource(prefix + 'api/technologies/:id', {id: '@id'});
        var technology = Technologies.get({id: tech_id}, function(res) {
            callback(res);
        })
    };

    F.updateCVTechnology = function(technology, cvId){
        var CVs = $resource(prefix + 'cv/:cv_id/technology/:id', {cv_id: '@id', id: '@id'}, {'update': { method:'PUT' }});
        CVs.update({cv_id: cvId, id: technology.id}, technology);
    };

    F.getProject = function(id, callback) {
        var Users_projects = $resource(prefix + 'api/users_projects/:id', {id: '@id'});
        var project = Users_projects.get({id: id}, function(res) {
            callback(res);
        })
    };

    F.createProject = function(obj, callback) {
        var project = {};
        project.name = obj.name;
        project.description = obj.description;
        project.technologies = [];
        project.start = obj.start;
        project.end = obj.end;

        if(obj.technologies.length > 0) {
            for (var i = 0; i < obj.technologies.length; i++) {
                project.technologies.push(obj.technologies[i].id);
            }
        }

        var Projects = $resource(prefix + 'api/projects');
        Projects.save(project, function(res){
            var userProject = {};
            userProject.user = userId;
            userProject.project = res.id;
            userProject.userRole = obj.userRole;
            userProject.start = obj.startDate;
            userProject.end = obj.endDate;

            Users_projects.save(userProject, function(res){
                callback(res.id);
            })

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
    };


    F.removeProject = function(project, callback) {
        var Users_projects = $resource(prefix + 'api/users_projects/:id', {id: '@id'});
        Users_projects.delete({id: project._id}, function(){
            callback(null);
        })
    };

    F.removeTechnology = function(technology, cvId, callback) {
        var CVs = $resource(prefix + 'cv/:cv_id/technology', {cv_id: '@id'}, {'update': { method:'PUT' }});
        CVs.update({cv_id: cvId}, technology, function(){
            callback(null);
        });
    };

    F.updateProject = function(obj){
        var userProject = {};
        userProject._id = obj._id;
        userProject.user = userId;
        userProject.project = obj.id;
        userProject.userRole = obj.userRole;
        userProject.start = obj.startDate.toString();

        if(obj.endDate !== null) {
            userProject.end = obj.endDate.toString();
        } else {
            userProject.end = null;
        }

        var Users_projects = $resource(prefix + 'api/users_projects/:id', {id: '@id'}, {'update': { method:'PUT' }});
        Users_projects.update({id: userProject._id}, userProject, function(res){
            console.log(res);
        });
    };

    return F;

});
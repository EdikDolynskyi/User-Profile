var app = require('../angular-app');

app.factory('cvPublicFactory', function($resource, $location) {
    var prefix = window.location.pathname;

    var userId = $location.path().split("/")[2];
    var cv = $resource(prefix + 'api/cvs/' + userId);
    var Technologies = $resource(prefix + 'api/technologies');
    var Projects = $resource(prefix + 'api/projects');
    var Categories = $resource(prefix + 'api/categories');
    var User_projects = $resource(prefix + '/api/users_projects');
    var F = {};

    F.getUserData = function(callback) {
        cv.get(function(res) {
            console.log("res " + res.userCV.id);
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

    F.getUsersProjects = function(callback) {
        User_projects.query(function(res) {
            callback(res);
        });
    };
    return F;

});
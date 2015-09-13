var async = require('async');

module.exports = {
    getUsers_Projects: function (user_id, callback) {
        Users_projects
            .find({where: {user: user_id, isDeleted: false}})
            .exec(function (err, users_projects) {
                getUserProjects(users_projects,callback);
            });
    },

    getObjUsers_Projects: function(id, callback) {
        Users_projects
            .findOne({where: {id: id}})
            .exec(function (err, objUserProject) {
                getProject(objUserProject,callback);
            });
    }
};

function getUserProjects(users_projects, asyncCallback){
    async.map(users_projects,
        function (objUserProject, callback){
            Projects
                .findOne(objUserProject.project)
                .exec(function (err, item){
                    if(err){
                        return callback(err);
                    }
                    getProjectParticipants(objUserProject.project, function(err, projectParticipants) {
                        async.parallel([getProjectTechnologies.bind(null,item)],
                            function(err, project) {
                                item._id = objUserProject.id;
                                item.userRole = objUserProject.userRole;
                                item.startDate = objUserProject.start;
                                item.endDate = objUserProject.end;
                                item.participants = projectParticipants;
                                item.current = false;

                                callback(err, item);
                            }
                        );
                    });
                });
        },
        function(errFromIterator, results){
            if(errFromIterator){
                asyncCallback(errFromIterator);
            }
            asyncCallback(null, results);
        });
}

function getProjectTechnologies(project, asyncCallback) {
    async.map(project.technologies,
        function (id, callback){
            Technologies
                .findOne(id)
                .populate('category')
                .exec(function (err, item){
                    if(err){
                        return callback(err);
                    }
                    callback(null, item);
                });
        },
        function (errFromIterator, results){
             if(errFromIterator){
                 asyncCallback(errFromIterator);
             } else {
                 project.technologies = results;
             }
             asyncCallback(null);
        });
}

function getProjectParticipants(projectId, callback) {
    Users_projects
        .find({project: projectId})
        .exec(function (err, projectParticipants) {
            getParticipantsData(projectParticipants,callback)
        });
}

function getParticipantsData(projectParticipants, asyncCallback) {
    async.map(projectParticipants, function (objUserProject, callback){
        Users
            .findOne(objUserProject.user)
            .exec(function (err, item){
                if(err){
                    return callback(err);
                }
                var participant = {};
                participant.id = item.id;
                participant.avatar = item.avatar;
                participant.name = item.name;
                participant.surname = item.surname;

                callback(null, participant);
            });

    },
    function (errFromIterator, results){
        if(errFromIterator){
            asyncCallback(errFromIterator);
        } else {
            asyncCallback(null, results);
        }
    });
}

function getProject(objUserProject,callback) {
    Projects
        .findOne(objUserProject.project)
        .exec(function (err, item){
            if(err){
                return callback(err);
            }
            getProjectParticipants(objUserProject.project, function(err, projectParticipants) {
                async.parallel([getProjectTechnologies.bind(null,item)],
                    function(err, project) {
                        item._id = objUserProject.id;
                        item.userRole = objUserProject.userRole;
                        item.startDate = objUserProject.start;
                        item.endDate = objUserProject.end;
                        item.participants = projectParticipants;

                        callback(err, item);
                    }
                );
            });
        });
}
var async = require('async');

module.exports = {
    getUsers_Projects: function(user_id, callback) {
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
                getProject(objUserProject, callback);
            });
    },

    updateObjUsers_Projects: function(id, body, callback) {
        Users_projects.native(function (err, collection) {
            if(err) return callback(err);

            collection.update({_id: Users_projects.mongo.objectId(id)}, {
                    $set: {
                        userRole: body.userRole,
                        start: body.startDate,
                        end: body.endDate || null
                    }
                },
                function (err) {
                    if (err) return callback(err);
                });
        });

        Users.native(function(err, collection) {
            if(err) return callback(err);

            collection.update({_id: Users.mongo.objectId(body.user)}, {
                $set: { currentProject: body.current == true ? body.project : null }
            },
            function(err) {
                if(err) return callback(err);

                callback(null);
            })
        })
    },

    createObjUsers_Projects: function(body, callback) {
       createProject(body, function(err, projectId) {
           if(err) callback(err);

           createUserProject(body, projectId, callback);
       });
    }
};


function getUserProjects(users_projects, asyncCallback){
    async.map(users_projects,
        function(objUserProject, callback) {
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
                return asyncCallback(errFromIterator);
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
                 return asyncCallback(errFromIterator);
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
                participant.role = objUserProject.userRole;

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
                async.parallel([getProjectTechnologies.bind(null, item)],
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

function createProject(body, callback) {
    var project = {};
    project.name = body.project.name;
    project.description = body.project.description;
    project.technologies = [];
    project.screenshots = body.project.screenshots;
    project.start = body.project.start;
    project.end = body.project.end;
    project.binary = body.project.binary;

    if(body.project.technologies.length > 0) {
        for (var i = 0; i < body.project.technologies.length; i++) {
            project.technologies.push(body.project.technologies[i].id);
        }
    }

    Projects
        .create(project)
        .exec(function(err, created) {
            if(err) callback(err);

            if(body.project.current) {
                setCurrentProject(body.userId, created.id, function(err) {
                    if(err) callback(err);
                });
            }

            callback(null, created.id)
        })
}

function createUserProject(body, projectId, callback) {
    var userProject = {};
    userProject.user = body.userId;
    userProject.project = projectId;
    userProject.userRole = body.project.userRole;
    userProject.start = body.project.startDate;
    userProject.end = body.project.endDate;

    Users_projects
        .create(userProject)
        .exec(function(err, created) {
            if(err) callback(err);

            callback(null, created);
        })
}

function setCurrentProject(userId, projectId, callback) {
    Users.native(function(err, collection) {
        if(err) return callback(err);

        collection.update({_id: Users.mongo.objectId(userId)}, {
                $set: { currentProject: projectId }
            },
            function(err) {
                if(err) return callback(err);

                callback(null);
            })
    })

}

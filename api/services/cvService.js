var async = require('async');

module.exports = {
    getUserCV : function(id, callback){
        Users
            .findOne({id: id })
            .populate('userCV')
            .exec(function (err, user) {
                async.parallel([
                    getUserProjects.bind(null,user),
                    getUserTechnologies.bind(null,user)],
                    callback.bind(null,null, user)
                );
        });
    },

    updateCVTechnologies: function(cv_id, id, body, callback){
        Cvs.findOne({id: cv_id})
            .exec(function(err, cv) {
                if (err) {
                    res.send(err);
                } else {
                    for(var i = 0; i < cv.technologies.length; i++){
                        if(cv.technologies[i].userTech == body.id){
                            cv.technologies[i].stars = body.stars;
                            cv.save();

                            break;
                        }
                    }
                }

                callback(null);
            });
    },

    addTechnologyToCV: function(cv_id, id, body, callback){
        Cvs.findOne({id: cv_id})
            .exec(function(err, cv) {
                if (err) {
                    res.send(err);
                } else {
                    var newTechnology = {};
                    newTechnology.userTech = body.id;
                    newTechnology.stars = body.stars.toString();

                    cv.technologies.push(newTechnology);
                    cv.save();
                }
                callback(null);
            });
    },

    addProjectToCV: function(cv_id, id, body, callback){
        Cvs.findOne({id: cv_id})
            .exec(function(err, cv) {
                if (err) {
                    res.send(err);
                } else {
                    var newProject = {};
                    newProject.projectId = body.id;
                    newProject.startDate = body.startDate;
                    newProject.participants = body.participants;
                    cv.projects.push(newProject);
                    cv.save();
                }
                callback(null);
            });
    },

    /*removeProjectFromCV: function(cv_id, id, body, callback){
        Cvs.findOne({id: cv_id})
            .exec(function(err, cv) {
                if (err) {
                    res.send(err);
                } else {
                    for(var i=0; i<cv.projects.length; i++){
                        if(cv.projects[i].projectId == id){
                            var projectIndex = i;
                            cv.projects.splice(projectIndex,1);
                            cv.save();

                            break;
                        }
                    }
                }
                callback(null);
            });
    }*/
}; //module.exports
 
function getUserProjects(user, asyncCallback){
    async.map(user.userCV.projects,
        function (objUserProject, callback){
            Projects
                .findOne(objUserProject.projectId)
                .exec(function (err, item){
                    item.startDate = objUserProject.startDate;
                    item.participants = objUserProject.participants;
                    if(err){
                        return callback(err);
                    }
                    async.parallel([getProjectTechnologies.bind(null,item)],
                        callback.bind(null,null, item)
                    ); //async.parallel
                });
        },
        function (errFromIterator, results){
            if(errFromIterator){
                res.serverError();
            } else {
                user.userCV.projects = results;
            }
            asyncCallback(null);
        });
}

function getProjectTechnologies(project, asyncCallback) {
    async.map(project.technologies,
        function (id, callback){
            Technologies
                .findOne(id)
                .exec(function (err, item){
                    if(err){
                        return callback(err);
                    }
                    callback(null, item);
                });
        },
        function (errFromIterator, results){
            if(errFromIterator){
                res.serverError();
            } else {
                project.technologies = results;
            }
            asyncCallback(null);
        });
}
    
function getUserTechnologies(user, asyncCallback) {
    async.map(user.userCV.technologies,
        function (objUserTechn, callback){
            Technologies
                .findOne(objUserTechn.userTech)
                .exec(function (err, item){
                    item.stars = objUserTechn.stars;
                    if(err){
                        return callback(err);
                    }
                    async.parallel([getTechnologyCategory.bind(null,item)],
                        callback.bind(null,null, item)
                    ); //async.parallel
                });

        },
        function (errFromIterator, results){
            if(errFromIterator){
                res.serverError();
            } else {
               user.userCV.technologies= results;
            }
            asyncCallback(null);
        });
}

function getTechnologyCategory(technology, callback){
    Categories
        .findOne(technology.category)
        .exec(function (err, item){
            if(err){
                return callback(err);
            }

            technology.category = item;
            callback(null, item);
        });
}



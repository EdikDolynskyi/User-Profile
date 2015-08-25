var async = require('async');

module.exports = {
    getUserCV : function(id, callback){
        Users
            .findOne({id: id })
            .populate('userCV')
            .exec(function (err, projects) {
                async.parallel([
                    getUserProjects.bind(null,projects),
                    getUserTechnologies.bind(null,projects),
                    ],
                    callback.bind(null,null, projects)
                ); //async.parallel
        }); //Users.exec        
    }, //getUserCV

    updateCVTechnologies: function(id, body, callback){
        Cvs.findOne({id: id})
            .exec(function(err, cv) {
                if (err) {
                    res.send(err);
                } else {
                    var newTechnology = {};
                    newTechnology.userTech = body.userTech;
                    newTechnology.stars = body.stars.toString();

                    if(cv.technologies.length == 0) {
                        cv.technologies.push(newTechnology);
                        cv.save();
                    } else {
                        for(var i = 0; i < cv.technologies.length; i++){
                            if(cv.technologies[i].userTech == body.id){
                                cv.technologies[i].stars = body.stars;
                                cv.save();

                                break;
                            }
                        }

                        if(body.userTech) {
                            cv.technologies.push(newTechnology);
                            cv.save();
                        }
                    }
                }

                callback(null);
            });
    }
}; //module.exports
 
    function getUserProjects(projects, asyncCallback){
        async.map(projects.userCV.projects, 
            function (objUserProject, callback){
                Projects
                    .findOne(objUserProject.projectId)
                    .exec(function (err, item){
                        item.startUserOnProject = objUserProject.startUserOnProject;
                        if(err){return callback(err);
                        }
                        async.parallel([                            
                            getProjectTechnologies.bind(null,item),
                            ],
                            callback.bind(null,null, item)
                        ); //async.parallel
                    });
            },
            function (errFromIterator, results){
                if(errFromIterator){
                    res.serverError();
                } else {
                    projects.userCV.projects = results;
                }         
                asyncCallback(null);
            });
    }   

    function getProjectTechnologies(project, asyncCallback){
        async.map(project.technologies, 
            function (id, callback){
                Technologies
                    .findOne(id)
                    .exec(function (err, item){
                        if(err){return callback(err);}
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
    
    function getUserTechnologies(projects, asyncCallback){
        

        async.map(projects.userCV.technologies, 
            function (objUserTechn, callback){
                Technologies
                    .findOne(objUserTechn.userTech)
                    .exec(function (err, item){
                        item.stars = objUserTechn.stars;
                        if(err){return callback(err);}
                        async.parallel([                            
                            getTechnologyCategory.bind(null,item),
                            ],
                            callback.bind(null,null, item)

                        ); //async.parallel                            
                        });

            },
            function (errFromIterator, results){
                if(errFromIterator){
                    res.serverError();
                } else {
                   projects.userCV.technologies= results;
                }         
                asyncCallback(null);
            });   
    }

    function getTechnologyCategory(technology, callback){
                Categories
                    .findOne(technology.category)
                    .exec(function (err, item){
                        if(err){return callback(err);}
                        	technology.category = item;
                            callback(null, item);
                        });         
    }

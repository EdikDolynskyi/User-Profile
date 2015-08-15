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
    } //getUserCV
}; //module.exports
 
    function getUserProjects(projects, asyncCallback){   
        async.map(projects.userCV.projects, 
            function (id, callback){
                Projects
                    .findOne(id)
                    .exec(function (err, item){
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
var async = require('async');

module.exports = {
    getUserCV : function(id, callback){
        Users
            .findOne({id: id })
            .populate('userCV')
            .exec(function (err, user) {
                async.parallel([getUserTechnologies.bind(null, user)],
                    callback.bind(null, null, user)
                );
        });
    },

    updateTechnology: function(cv_id, id, body, callback){
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

    addTechnologyToCV: function(cv_id, body, callback){
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

                    callback(null);
                }
            });
    },

    removeTechnologyFromCV: function(cv_id, body, callback){
        Cvs.native(function(err, collection) {
            collection.update({_id: Cvs.mongo.objectId(cv_id)}, {$pull: {technologies: {userTech: body.id}}}, function(err){
                if(err) {
                    return callback (err);
                } else {
                    callback(null);
                }
            });
        });
    },

    getTechnology: function(cv_id, technology_id, callback){
        Cvs.findOne({id: cv_id})
            .exec(function(err, cv) {
                if (err) {
                    res.send(err);
                } else {
                    async.parallel([getTechnology.bind(null, cv, technology_id)], function(technology) {
                            callback(technology);
                        }
                    );
                }
            })
    }

}; //module.exports

function getUserTechnologies(user, callback) {
    async.map(user.userCV.technologies,
        function (objUserTechn, callback){
            Technologies
                .findOne(objUserTechn.userTech)
                .exec(function(err, item) {
                    item.stars = objUserTechn.stars;
                    if(err) {
                        return callback(err);
                    }

                    async.parallel([getTechnologyCategory.bind(null, item)],
                        callback.bind(null, null, item)
                    ); //async.parallel
                });

        },
        function (err, results){
            if(err) {
                return callback(err);
            }

            user.userCV.technologies = results;
            callback(null);
        });
}

function getTechnologyCategory(technology, callback){
    Categories
        .findOne(technology.category)
        .exec(function (err, item){
            if(err) {
                return callback(err);
            }

            technology.category = item;
            callback(null, item);
        });
}


function getTechnology(cv, technology_id, callback) {
    async.map(cv.technologies,
        function(item, callback){
            Technologies
                .findOne(item.userTech)
                .exec(function(err, technology) {
                    technology.stars = item.stars;

                    if(err) {
                        return callback(err);
                    }

                    async.parallel([getTechnologyCategory.bind(null, technology)],
                        callback.bind(null, null, technology)
                    ); //async.parallel
                });

        },
        function(err, results) {
            if(err) {
                return callback(err);
            } else {
                cv.technologies = results;

                for(var i = 0; i < cv.technologies.length; i++) {
                    if(cv.technologies[i].id == technology_id) {
                        callback(cv.technologies[i]);
                        break;
                    }
                }
            }
        });
}




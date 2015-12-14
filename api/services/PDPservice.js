var async = require('async');

module.exports = {

    getPDP: function (id, callback) {


        Pdps.findOne({id: id })
            .populateAll()
            .exec(function (err, pdp) {
                async.parallel([
                    populateAchievements.bind(null, pdp),
                    populateCompletedCertifications.bind(null, pdp),
                    populateCertifications.bind(null, pdp),
                    populateTests.bind(null, pdp),
                    populateTechnologies.bind(null, pdp)
                    ], callback.bind(null,null, pdp));
            });
    },

    addCompletedCertification: function(id, body, callback){

        Pdps.findOne({id: id})
            .exec(function(err, pdp){
                if (err) {
                    res.send(err);
                } else {
                    var newObj = {};
                    newObj.id = body.id;
                    newObj.description = body.description;
                    pdp.completedCertifications.push(newObj);
                    pdp.save();
                }
                callback(null);
            })
    },

    removeCompletedCertification: function(id, body, callback){

        Pdps.findOne({id: id})
            .exec(function(err, pdp) {
                if (err) {
                    res.send(err);
                } else {
                    for(var i = 0; i<pdp.completedCertifications.length; i++)
                    {
                        if(pdp.completedCertifications[i].id == body.id){
                            pdp.completedCertifications.splice(i, 1);
                            pdp.save();
                            break;
                        }
                    }
                }
                callback(null);    
            });
    },

    addAchievement: function(id, body, callback){

        Pdps.findOne({id: id})
            .exec(function(err, pdp){
                if (err) {
                    res.send(err);
                } else {
                    var newObj = {};
                    newObj.id = body.id;
                    newObj.description = body.description;
                    pdp.achievements.push(newObj);
                    pdp.save();
                }
                callback(null);
            })
    },

    removeAchievement: function(id, body, callback){

        Pdps.findOne({id: id})
            .exec(function(err, pdp) {
                if (err) {
                    res.send(err);
                } else {
                    for(var i = 0; i<pdp.achievements.length; i++)
                    {
                        if(pdp.achievements[i].id == body.id){
                            pdp.achievements.splice(i, 1);
                            pdp.save();
                            break;
                        }
                    }
                }
                callback(null);    
            });
    },

    addTechnology: function(id, body, callback){

        Pdps.findOne({id: id})
            .exec(function(err, pdp){
                if (err) {
                    res.send(err);
                } else {
                    var newObj = {};
                    newObj.id = body.id;
                    newObj.completed = body.completed;
                    pdp.technologies.push(newObj);
                    pdp.save();
                }
                callback(null);
            })
    },

    removeTechnology: function(id, body, callback){

        Pdps.findOne({id: id})
            .exec(function(err, pdp) {
                if (err) {
                    res.send(err);
                } else {
                    for(var i = 0; i<pdp.technologies.length; i++)
                    {
                        if(pdp.technologies[i].id == body.id){
                            pdp.technologies.splice(i, 1);
                            pdp.save();
                            break;
                        }
                    }
                }
                callback(null);    
            });
    },

    addCertification: function(id, body, callback){

        Pdps.findOne({id: id})
            .exec(function(err, pdp){
                if (err) {
                    res.send(err);
                } else {
                    var newObj = {};
                    newObj.id = body.id;
                    newObj.completed = body.completed;
                    pdp.certifications.push(newObj);
                    pdp.save();
                }
                callback(null);
            })
    },

    removeCertification: function(id, body, callback){

        Pdps.findOne({id: id})
            .exec(function(err, pdp) {
                if (err) {
                    res.send(err);
                } else {
                    for(var i = 0; i<pdp.certifications.length; i++)
                    {
                        if(pdp.certifications[i].id == body.id){
                            pdp.certifications.splice(i, 1);
                            pdp.save();
                            break;
                        }
                    }
                }
                callback(null);    
            });
    },

    addTest: function(id, body, callback){

        Pdps.findOne({id: id})
            .exec(function(err, pdp){
                if (err) {
                    res.send(err);
                } else {
                    var newObj = {};
                    newObj.id = body.id;
                    newObj.completed = body.completed;
                    pdp.tests.push(newObj);
                    pdp.save();
                }
                callback(null);
            })
    },

    removeTest: function(id, body, callback){

        Pdps.findOne({id: id})
            .exec(function(err, pdp) {
                if (err) {
                    res.send(err);
                } else {
                    for(var i = 0; i<pdp.tests.length; i++)
                    {
                        if(pdp.tests[i].id == body.id){
                            pdp.tests.splice(i, 1);
                            pdp.save();
                            break;
                        }
                    }
                }
                callback(null);    
            });
    },

    addTask: function(id, body, callback){

        Pdps.findOne({id: id})
            .exec(function(err, pdp) {
                if (err) {
                    res.send(err);
                } else {
                    pdp.tasks.push(body);
                    pdp.save();
                }
                callback(null);    
            });
    },

    removeTask: function(id, body, callback){

        Pdps.findOne({id: id})
            .exec(function(err, pdp) {
                if (err) {
                    res.send(err);
                } else {
                    for(var i = 0; i<pdp.tasks.length; i++)
                    {
                        if(pdp.tasks[i].name == body.name){
                            pdp.tasks.splice(i, 1);
                            pdp.save();
                            break;
                        }
                    }
                }
                callback(null);    
            });
    },

    updatePosition: function(id, body, callback){

        Pdps.findOne({id: id})
            .exec(function(err, pdp){
                if (err) {
                    res.send(err);
                } else {
                    pdp.position = body.id;
                    pdp.save();
                }
                callback(null);
            })
    },

    updateDirection: function(id, body, callback){

        Pdps.findOne({id: id})
            .exec(function(err, pdp){
                if (err) {
                    res.send(err);
                } else {
                    pdp.direction = body.id;
                    pdp.save();
                }
                callback(null);
            })
    },

    updateTechnologies: function(id, body, callback){

        Pdps.findOne({id: id})
            .exec(function(err, pdp) {
                if (err) {
                    res.send(err);
                } else {
                    for(var i = 0; i<pdp.technologies.length; i++){
                        if(pdp.technologies[i].id == body.id){
                            pdp.technologies[i].completed = !pdp.technologies[i].completed;
                            pdp.save();
                            break;
                        }
                    }
                }
                callback(null);    
            });
    },

    updateCertifications: function(id, body, callback){

        Pdps.findOne({id: id})
            .exec(function(err, pdp) {
                if (err) {
                    res.send(err);
                } else {
                    for(var i = 0; i<pdp.certifications.length; i++){
                        if(pdp.certifications[i].id == body.id){
                            pdp.certifications[i].completed = !pdp.certifications[i].completed;
                            pdp.save();
                            break;
                        }
                    }
                }
                callback(null);    
            });
    },

    updateTests: function(id, body, callback){

        Pdps.findOne({id: id})
            .exec(function(err, pdp) {
                if (err) {
                    res.send(err);
                } else {
                    for(var i = 0; i<pdp.tests.length; i++){
                        if(pdp.tests[i].id == body.id){
                            pdp.tests[i].completed = !pdp.tests[i].completed;
                            pdp.save();
                            break;
                        }
                    }
                }
                callback(null);    
            });
    },

    updateTasks: function(id, body, callback){

        Pdps.findOne({id: id})
            .exec(function(err, pdp) {
                if (err) {
                    res.send(err);
                } else {
                    for(var i = 0; i<pdp.tasks.length; i++){
                        if(pdp.tasks[i].name == body.name){
                            pdp.tasks[i].completed = !pdp.tasks[i].completed;
                            pdp.save();
                            break;
                        }
                    }
                }
                callback(null);    
            });
    }
};
    function populateAchievements(pdp, asyncCallback){
        async.map(pdp.achievements, function (achievement, callback){
            Achievements
            .findOne(achievement.id)
            .populate('category')
            .exec(function (err, item){
                if(err){return callback(err)};
                    callback(null, item);
                });
            },
            function (errFromIterator, results){
                if(errFromIterator){res.serverError()};
                for(var i = 0; i<results.length; i++){
                    pdp.achievements[i].name = results[i].name;
                    pdp.achievements[i].src = results[i].src;
                    pdp.achievements[i].category = results[i].category;
                }               
                asyncCallback(null);
            });
    }
    function populateCompletedCertifications(pdp, asyncCallback){
        async.map(pdp.completedCertifications, function (certification, callback){
            Certifications
            .findOne(certification.id)
            .populate('category')
            .exec(function (err, item){
                if(err){return callback(err)};
                    callback(null, item);
                });
            },
            function (errFromIterator, results){
                if(errFromIterator){res.serverError()};
                for(var i = 0; i<results.length; i++){
                    pdp.completedCertifications[i].name = results[i].name;
                    pdp.completedCertifications[i].src = results[i].src;
                    pdp.completedCertifications[i].category = results[i].category;
                }               
                asyncCallback(null);
            });
    }
    function populateCertifications(pdp, asyncCallback){
        async.map(pdp.certifications, function (certification, callback){
            Certifications
            .findOne(certification.id)
            .exec(function (err, item){
                if(err){return callback(err)};
                callback(null, item);
            });
        },
        function (errFromIterator, results){
            if(errFromIterator){res.serverError()};

            for(var i = 0; i<results.length; i++){
                pdp.certifications[i].name = results[i].name;
            }
            asyncCallback(null);              
        });
    }
    function populateTests(pdp, asyncCallback){
        async.map(pdp.tests, function (test, callback){
            Tests
            .findOne(test.id)
            .exec(function (err, item){
                if(err){return callback(err)};
                callback(null, item);
            });
        },
        function (errFromIterator, results){
            if(errFromIterator){res.serverError()};

            for(var i = 0; i<results.length; i++){
                pdp.tests[i].name = results[i].name;
            }
            asyncCallback(null);              
        });
    }
    function populateTechnologies(pdp, asyncCallback){
        async.map(pdp.technologies, function (technology, callback){
            Technologies
            .findOne(technology.id)
            .exec(function (err, item){
                if(err){return callback(err)};
                callback(null, item);
            });
        },
        function (errFromIterator, results){
            if(errFromIterator){res.serverError()};
        
            for(var i = 0; i<results.length; i++){
                pdp.technologies[i].name = results[i].name;
            }
            asyncCallback(null);                
        });
    }
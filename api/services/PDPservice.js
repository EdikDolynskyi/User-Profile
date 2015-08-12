var async = require('async');

module.exports = {

    getPDP: function (id, callback) {


        Pdps.findOne({id: id })
            .populateAll()
            .exec(function (err, pdp) {
                async.parallel([
                    populateAchievements.bind(null, pdp),
                    populateCertifications.bind(null, pdp),
                    populateTests.bind(null, pdp),
                    populateTechnologies.bind(null, pdp)
                    ], callback.bind(null,null, pdp));
            });
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
            .exec(function (err, item){
                if(err){return callback(err)};
                    callback(null, item);
                });
            },
            function (errFromIterator, results){
                if(errFromIterator){res.serverError()};
                for(var i = 0; i<results.length; i++){
                    pdp.achievements[i].name = results[i].name;
                    pdp.achievements[i].img = results[i].image;
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
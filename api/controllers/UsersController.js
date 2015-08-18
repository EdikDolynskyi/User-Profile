/**
 * UsersController
 *
 * @description :: Server-side logic for managing positions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var async = require('async');
var _ = require('underscore');

module.exports = {
    filter: function (req, res) {
        var technology = req.query.technology;
        var knowLevel = req.query.knowlevel;
        var direction = req.query.direction;
        var position = req.query.position;
        var certificate = req.query.certificate;

        if (!(technology || knowLevel || direction || position || certificate)) {
            Users.find({}).exec(function (err, users) { res.send(users); });
            return;
        }

        var tasks = {};
        if (technology)
            tasks.technology = function (cb) { Technologies.findOne({"name": technology}).exec(cb); };
        if (direction)
            tasks.direction = function(cb){ Directions.findOne({'name': direction}).exec(cb); };
        if (position)
            tasks.position = function(cb){ Positions.findOne({'name': position}).exec(cb); };
        if (certificate)
            tasks.certificate = function(cb) { Certifications.findOne({'name' : certificate}).exec(cb); };

        async.parallel(tasks, function (err, results) {
            var upTasks = {};
            //CV
            if (results.technology) {
                var cvParams = {
                    technologies: { $elemMatch: {userTech: results.technology.id} }
                };
                if (knowLevel)
                    cvParams.technologies.$elemMatch.stars = knowLevel;

                upTasks.cvs = function(cb) {
                    Cvs.find(cvParams).exec(function (err, cvs){
                        var cvsIds = _.map(cvs, function (cv) { return cv.id; });
                        cb(err, cvsIds);
                    })
                }
            }
            //PDP
            if (results.direction || results.position || results.certificate) {
                var pdpParams = {};
                if (results.direction)
                    pdpParams.direction = results.direction.id;
                if (results.position)
                    pdpParams.position = results.position.id;
                if (results.certificate)
                    pdpParams.certificates = { $elemMatch: { name: results.certificate.id } };
                
                upTasks.pdps = function (cb) {
                    Pdps.find(pdpParams).exec(function (err, pdps){
                        var pdpIds = _.map(pdps, function (pdp) { return pdp.id; });
                        cb(err, pdpIds);
                    })
                }
            }

            async.parallel(upTasks, function (err, results) {
                var upLookupParams = {};
                if (results.cvs)
                    upLookupParams.userCV = { $in: results.cvs};
                if (results.pdps)
                    upLookupParams.userPDP = { $in: results.pdps};

                Users.find(upLookupParams).exec(function (err, users) {
                    res.send(users);
                });
            });
        });
    }
};
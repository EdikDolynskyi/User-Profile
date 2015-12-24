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
            Users.find({ isDeleted : false }).exec(function (err, users) {
                prepareSearchUserDTOs(users, function (data) {
                    res.send(data);
                });
            });
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
                upLookupParams.isDeleted = false;
                Users.find(upLookupParams).where({ isDeleted : false }).exec(function (err, users) {
                    prepareSearchUserDTOs(users, function (data) {
                        res.send(data);
                    });
                });
            });
        });
    },
    getByCentralId: function(req,res){
        Users.find({serverUserId: req.params.id}).exec(function(err, user){
            res.send(user);
        })
    },

    updateCurrentProject: function(req,res) {
        Users.native(function(err,collection) {
            collection.update({_id: Users.mongo.objectId(req.param('id'))}, {$set: {currentProject: req.body.id || null}})
        }, function(err, data){
                if (err) {
                    res.send(err)
                } else {
                    res.send(data);
                }
            });
        },

    deleteUser: function(req, res){
        Users.findOne({serverUserId: req.params.id}).exec(function(err, user){
            if (!err){
                user.isDeleted = true;
                user.save();
                var tasks = {};
                tasks.removedPDP = function(cb){
                    Pdps.findOne({id: user.userPDP}).exec(function(err, pdp) {    
                        pdp.isDeleted = true;
                        pdp.save();
                        cb(err, pdp);
                    });
                };
                tasks.removedCV = function(cb){
                    Cvs.findOne({id: user.userCV}).exec(function(err, cv){
                        cv.isDeleted = true;
                        cv.save();
                        cb(err, cv);
                    });
                };
                tasks.removedUserProjects = function(cb){
                    Users_projects.native(function(err, collection) {
                        collection.update({user: req.params.id}, {$set: { isDeleted: true }}, {multi: true});
                        cb(err, collection);
                    });                
                };
                async.parallel(tasks, function(err, results){
                    if (!err){
                        res.send(200);
                    } else {
                        res.send(404);
                    }
                });
            } else {
                res.send(404);
            }
        });
    }
};

function prepareSearchUserDTOs(users, cb) {
    var pdpIdList =  _.pluck(users, 'userPDP');
    Pdps.find().where({ id: pdpIdList }).populate('direction').exec(function(err, pdps) {
        var temp = {};
        _.each(pdps, function (pdp) {
            temp[pdp.id] = pdp.direction.name;
        });
        var result = _.map(users, function(user) {
            return {
                id: user.id,
                name: user.name + ' ' + user.surname,
                department: temp[user.userPDP],
                avatar: user.avatar.urlAva
            }
        });
        cb(result);
    });
}
/**
 * PdpsController
 *
 * @description :: Server-side logic for managing positions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getPDP: function(req, res){
        PDPservice.getPDP(req.param('id'), function(err,data){
        	if (err) {
                    res.send(err);
            } else {
                return res.send(data);
            }
        });
    },
    addCompletedCertification: function(req, res){
        PDPservice.addCompletedCertification(req.param('id'), req.body, function(err,data){
            if (err) {
                    res.send(err);
            } else {
                return res.send(data);
            }
        });
    },
    removeCompletedCertification: function(req, res){
        PDPservice.removeCompletedCertification(req.param('id'), req.body, function(err,data){
            if (err) {
                    res.send(err);
            } else {
                return res.send(data);
            }
        });
    },
    addAchievement: function(req, res){
        PDPservice.addAchievement(req.param('id'), req.body, function(err,data){
            if (err) {
                    res.send(err);
            } else {
                return res.send(data);
            }
        });
    },
    removeAchievement: function(req, res){
        PDPservice.removeAchievement(req.param('id'), req.body, function(err,data){
            if (err) {
                    res.send(err);
            } else {
                return res.send(data);
            }
        });
    },
    addTechnology: function(req, res){
        PDPservice.addTechnology(req.param('id'), req.body, function(err,data){
            if (err) {
                    res.send(err);
            } else {
                return res.send(data);
            }
        });
    },
    removeTechnology: function(req, res){
        PDPservice.removeTechnology(req.param('id'), req.body, function(err,data){
            if (err) {
                    res.send(err);
            } else {
                return res.send(data);
            }
        });
    },
    addCertification: function(req, res){
        PDPservice.addCertification(req.param('id'), req.body, function(err,data){
            if (err) {
                    res.send(err);
            } else {
                return res.send(data);
            }
        });
    },
    removeCertification: function(req, res){
        PDPservice.removeCertification(req.param('id'), req.body, function(err,data){
            if (err) {
                    res.send(err);
            } else {
                return res.send(data);
            }
        });
    },
    addTest: function(req, res){
        PDPservice.addTest(req.param('id'), req.body, function(err,data){
            if (err) {
                    res.send(err);
            } else {
                return res.send(data);
            }
        });
    },
    removeTest: function(req, res){
        PDPservice.removeTest(req.param('id'), req.body, function(err,data){
            if (err) {
                    res.send(err);
            } else {
                return res.send(data);
            }
        });
    },
    addTask: function(req,res){
        PDPservice.addTask(req.param('id'), req.body, function(err,data){
            if (err) {
                    res.send(err);
            } else {
                return res.send(data);
            }
        });
    },
    removeTask: function(req, res){
        PDPservice.removeTask(req.param('id'), req.body, function(err,data){
            if (err) {
                    res.send(err);
            } else {
                return res.send(data);
            }
        });
    },
    updatePosition: function(req, res){
        PDPservice.updatePosition(req.param('id'), req.body, function(err,data){
            if (err) {
                    res.send(err);
            } else {
                return res.send(data);
            }
        });
    },
    updateDirection: function(req, res){
        PDPservice.updateDirection(req.param('id'), req.body, function(err,data){
            if (err) {
                    res.send(err);
            } else {
                return res.send(data);
            }
        });
    },
    updateTechnologies: function(req, res){
        PDPservice.updateTechnologies(req.param('id'), req.body, function(err,data){
            if (err) {
                    res.send(err);
            } else {
                return res.send(data);
            }
        });
    },
    updateCertifications: function(req, res){
        PDPservice.updateCertifications(req.param('id'), req.body, function(err,data){
            if (err) {
                    res.send(err);
            } else {
                return res.send(data);
            }
        });
    },
    updateTasks: function(req, res){
        PDPservice.updateTasks(req.param('id'), req.body, function(err,data){
            if (err) {
                    res.send(err);
            } else {
                return res.send(data);
            }
        });
    },
    updateTests: function(req, res){
        PDPservice.updateTests(req.param('id'), req.body, function(err,data){
            if (err) {
                    res.send(err);
            } else {
                return res.send(data);
            }
        });
    }
};
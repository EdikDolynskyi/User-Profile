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
/**
 * CvsController
 *
 * @description :: Server-side logic for managing positions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
// var userPoject = [];


module.exports = {

	findOne : function(req, res){
		cvService.getUserCV(req.param('id'), function(err, data){
			if(err){
				res.send(err);
			}else{
				res.send(data);
			}
		});
	},

	getTechnology: function(req, res) {
		cvService.getTechnology(req.param('cv_id'), req.param('id'), function(err,data){
			if (err) {
				res.send(err);
			} else {
				return res.send(data);
			}
		});
	},

	updateTechnology: function(req, res) {
		cvService.updateTechnology(req.param('cv_id'), req.param('id'), req.body, function(err,data){
			if (err) {
				res.send(err);
			} else {
				return res.send(data);
			}
		});
	},

	addTechnologyToCV: function(req, res) {
		cvService.addTechnologyToCV(req.param('cv_id'), req.body, function(err,data){
			if (err) {
				res.send(err);
			} else {
				return res.send(data);
			}
		});
	},

	removeTechnologyFromCV: function(req, res) {
		cvService.removeTechnologyFromCV(req.param('cv_id'), req.body, function(err){
			if (err) {
				res.send(err);
			} else {
				return res.send(200);
			}
		});
	}
};
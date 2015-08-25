/**
 * CvsController
 *
 * @description :: Server-side logic for managing positions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
// var userPoject = [];


module.exports = {

	findOne : function(req, res){
		servProject.getUserCV(req.param('id'), function(err, data){
			if(err){
				res.send(err);
			}else{
				res.send(data);
			}
		});
	},

	updateCVTechnologies: function(req, res) {
		servProject.updateCVTechnologies(req.param('id'), req.body, function(err,data){
			if (err) {
				res.send(err);
			} else {
				return res.send(data);
			}
		});
	}
};
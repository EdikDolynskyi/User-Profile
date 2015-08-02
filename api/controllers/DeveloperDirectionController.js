/**
 * DeveloperDirectionController
 *
 * @description :: Server-side logic for managing developerdirections
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	addDirection : function(req, res){
		var duplicate = DeveloperDirection.find({devDirectName : req.body.devDirectName});
		if (duplicate.length == 0){
			DeveloperDirection.create(req.body).exec(function(err, newDeveloperDidection){
				if(err){
					return res.negotiate(err);
				}else{
					return res.ok(newDeveloperDidection);
				} 

			});

		}else{
			res.send(403, 'Sorry, this Developer Didection has already been created');
		}

	},

	updateDirection : function(req, res){
		DeveloperDirection.update({ id: req.body.id }, { devDirectName: req.body.devDirectName })
		.exec(function(err, devDep) {
			if(err){
				return res.negotiate(err);
			}else{
				return res.ok(devDep);
			}
		});
	},
	deleteDirection : function(req, res){
		DeveloperDirection.destroy({ id: req.params.id })
		.exec(function(err, devDep) {
			if(err){
				res.negotiate(err);
			}else{
				return res.ok(devDep);
			}
});
	}

	
};


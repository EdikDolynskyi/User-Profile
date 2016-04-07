module.exports = {

	getProject : function(req, res){
		var obj = {
			project: req.param('id')
		};
		usersProjectsService.getProject(obj, function(err, data){
			if(err){
				res.send(err);
			}else{
				res.send(data);
			}
		});
	},

	updateProject: function(req, res){
		usersProjectsService.updateObjProjects(req.param('id'), req.body, function(err, data){
			if(err){
				res.send(err);
			} else{
				res.send(200);
			}
		});
	}
};
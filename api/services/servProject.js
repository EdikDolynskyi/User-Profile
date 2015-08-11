var async = require('async');

module.exports = {

	getUserCV:function(id, res, callback){
        
		Users
			.findOne(id)
			.populate('userCV')
			.exec(function (err, itemCV) {

                async.map(itemCV.userCV.projects,
					function (project, callback) {

						Projects
							.findOne(project)
							.exec(function (err, itemProject){
                                 
                                callback(null, itemProject);
							});


					},
					function (errFromIterator, results){
						if(errFromIterator){
                            res.serverError();
                        }
						callback(err, results);
					}
				);

			});
	},
    
    getProjectTechnologies : function (projectItem, res, callback){
        async.map(projectItem.technologies,
            function (technology, callback) {

                Technologies
                    .findOne(technology)
                    .exec(function (errTechn, TechnItem){

                        if(errTechn){
                            return callback(errTechn);
                        }
                        callback(null, TechnItem);
                        //console.log(TechnItem);
                    });

            },
            function (errFromIterator, results){
                if(errFromIterator){
                    res.serverError();
                }
                callback(errFromIterator, results);
            }
        )
    }
    
    
};
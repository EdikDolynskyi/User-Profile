var async = require('async');

module.exports = {
getUserCV : function(id, res, callback){
	async.waterfall([
		// function(callback){
		// 	callback(id, res, callback);
		// },
			function (callback){     //getUserProj:
		
// console.log(id,'************************************************');		        
					Users
						.findOne(id)
						.populate('userCV')
						.exec(function (err, itemCV) {
// console.log(itemCV, '///////////////////////////////////////////////////////');
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

									callback(null, results);
								}
							);

						});
				},// getUserProj
			    
			    function ( projectItem,  callback){		// getProjectTechnologies :
			    	// console.log(projectItem);
			        async.map(projectItem,
			            function (project, callback) {
			            		 
			            	async.map(project.technologies,
			            		function (techn, callback){
			            			Technologies
					                    .findOne(techn)
					                    .exec(function (errTechn, TechnItem){
					                        if(errTechn){
					                            return callback(errTechn);
					                        }
					                        callback(null, TechnItem);
					                        console.log(TechnItem);
			                    		});
			            		});
			              console.log(project);

			            },
			            function (errFromIterator, projectItem, results){
			                if(errFromIterator){
			                    res.serverError();
			                }
			                callback(null, results, projectItem);
			            }
			        );
			    }],

			    function ( results, projectItem){
			    	
			    			    	callback(results);
			    });	// getProjectTechnologies
		
    } //getUserCV
    
};
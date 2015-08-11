var async=require('async');
// var _=require('underscore');


module.exports = {

	getUserCV:function(id, res, callback){
		Users
			.findOne(id)
			.populate('userCV')
			.exec(function (err, itemCV) {

				async.map(itemCV.userCV.projects,
					function (project, callback) {

						Projects
							.find({id:project})
							.populateAll()
							.exec(function (err, itemProj){

								async.map(itemProj[0].technologies,
									function (technology, callback) {

										Technologies
											.find({id:technology})
											.populateAll()
											.exec(function (errProjects, TechnItem){

												//if(errTechn){return callback(errTechn)}
												//callback(null, TechnItem);
												console.log(TechnItem);
											});

									},
									function (errFromIterator, results){
										if(errFromIterator){res.serverError()}

										var itemCVoJSON = itemCV.toJSON();

										itemCVoJSON = results;
										console.log(results, 'result');
										// var clone = _.clone(itemPostToJSON);
										// 													console.log(clone);
										callback(err, results);
									}
								)
							});


					},
					function (errFromIterator, results){
						if(errFromIterator){res.serverError()};

						var itemCVoJSON = itemCV.toJSON();

						itemCVoJSON = results;
						console.log(results, 'result');
						// var clone = _.clone(itemPostToJSON);
						// 													console.log(clone);
						callback(err, results);
					}
				)

			});
	}
};
var async=require('async');
// var _=require('underscore');


module.exports = {

	getUserCV:function(id, res, callback){
		console.log(id, "id");
		Users
			.findOne(id)
			.populate('userCV')
			.exec(function (err, itemCV){
			    															console.log(itemCV, "cvItem");
			    async.map(itemCV.userCV.projects, function (project, callback){
			    											// 	console.log(itemCV.userCV.projects, 'Продж');
            		Projects
            		.find({id:project})
            		.populateAll()
            		.exec(function (err, itemProj){
            			async.map(itemProj.technologies, function (techn, callback){
            				Technologies
            				.find({id:techn})
            				.populateAll()
            				.exec(function (errProjects, TechnItem){
               		 			if(errTechn){return callback(errTechn)};
               				 callback(null, TechnItem);
               				 	console.log(TechnItem);
            			});
            		});
               				 												
            }),
			        
			        function (errFromIterator, results){
			            if(errFromIterator){res.serverError()};

			            var itemCVoJSON = itemCV.toJSON();

			            itemCVoJSON = results;
			            													 console.log(results, 'result');
			            // var clone = _.clone(itemPostToJSON);
			            // 													console.log(clone);
			            callback(err, results);
			        }
			    });
			});
	}
};
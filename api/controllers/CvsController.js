/**
 * CvsController
 *
 * @description :: Server-side logic for managing positions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
// var userPoject = [];


module.exports = {

	findCv : function(req, res){

		servProject.getUserCV(req.param('id'), function(err, data){
			if(err){
				res.send(err);
			}else{
				
				res.send(data);
			}
		});
        
      
        
	}
};
/**
 * CvsController
 *
 * @description :: Server-side logic for managing positions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var userPoject = [];


module.exports = {

	findOne : function(req, res){
		servProject.getUserCV(req.param('id'), res, function(err, data){
			
            userPoject = data;
            
           
            for (var i = 0; i < userPoject.length ; i++ ){
                servProject.getProjectTechnologies(userPoject[i], res, function(errTechnologies, dataTechnologies){
			    console.log(dataTechnologies);
                userPoject[i].technologiesList = dataTechnologies;
            

    //            if(err){
    //				res.send(errTechnologies);
    //			}else{
    //				res.send(userPoject);
    //			}
              });  
            }

            console.log(userPoject);
            
//            if(err){
//				res.send(err);
//			}else{
//				res.send(userPoject);
//			}
		});
        
      
        
	}
};
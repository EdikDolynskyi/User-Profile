/**
 * AchievementController
 *
 * @description :: Server-side logic for managing achievements
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getAchieveByID: function(req, res){
        return res.send("You try to get achieve with ID = " +req.param("achID"));
    },
    addAchieve: function(req, res){
    	return res.send("You try to add achieve to DB");
    },
    deleteAchieveByID: function(req, res){
    	return res.send("You try to delete achieve with ID = "+req.param("achID"));
    },
    updateAchieveByID: function(req, res){
    	return res.send("You try to update achieve with ID = "+req.param("achID"));
    },
    addAchieveToUser: function(req, res){
    	return res.send("You try to add achieve with ID = "+req.param("achID")+" to user with ID = "+req.param("userID"));
    },
    deleteAchieveFromUser: function(req, res){
    	return res.send("You try to delete achieve with ID = "+req.param("achID")+" from user with ID = "+req.param("userID"));
    }
};


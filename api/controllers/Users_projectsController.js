/**
 * User_projectsController
 *
 * @description :: Server-side logic for managing positions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getUserProjects: function(req, res){
        usersProjectsService.getUsers_Projects(req.param('user_id'),function(err, data){
            if(err){
                res.send(err);
            } else{
                res.send(data);
            }
        });
    },

    getProject: function(req, res){
        usersProjectsService.getObjUsers_Projects(req.param('id'),function(err, data){
            if(err){
                res.send(err);
            } else{
                res.send(data);
            }
        });
    },

    createProject: function(req, res){
        usersProjectsService.createObjUsers_Projects(req.body,function(err, data){
            if(err){
                res.send(err);
            } else{
                res.send(data);
            }
        });
    },

    updateProject: function(req, res){
        usersProjectsService.updateObjUsers_Projects(req.param('id'), req.body, function(err){
            if(err){
                res.send(err);
            } else{
                res.send(200);
            }
        });
    }
};
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
    }
};
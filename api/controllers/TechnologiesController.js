/**
 * TechnologiesController
 *
 * @description :: Server-side logic for managing technologies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    findOne: function(req, res) {

        servTechnolgies.getAllTechnologies(function(err, data) {
            if (err) {
                res.send(err);
            } else {
                res.send(data);
            }
        });



    }

};
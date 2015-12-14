var async = require('async');

module.exports = {
    /*getAllTechnologies: function(asyncCallback) {
        Technologies
            .find()
            .where({ isDeleted : false })
            .exec(function(err, technologies) {
                async.map(technologies, function(technology, callback) {

                        Categories
                            .findOne(technology.category)
                            .exec(function(err, item) {
                                if (err) {
                                    return callback(err);
                                }

                                technology.category = item;

                                callback(null, item);


                            });

                    },
                    function(errFromIterator, results) {

                        if (errFromIterator) {
                            asyncCallback(null);
                        } else {

                            asyncCallback(technologies);
                        }

                    });
            });
    },*/

};











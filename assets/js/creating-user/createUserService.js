var app = require('../angular-app');

app.service('createUserService', createUserService);

function createUserService($resource) {

    var prefix = window.location.pathname;
    prefix = prefix.substr(0, 9);

    this.createUser = function (user, cv, pdp, cb) {
        $resource(prefix + 'api/cvs').save(cv, function (cvRez) {
            user.userCV = cvRez.id;
            $resource(prefix + 'api/pdps').save(pdp, function (pdpRez) {
                user.userPDP = pdpRez.id;
                $resource(prefix + 'api/users').save(user, function (userRez) {
                    console.log(userRez);
                    cb(userRez);
                });
            });
        });
    };

    this.getPositions = function (cb) {
        var Positions = $resource(prefix + 'api/positions');
        var positions = Positions.query(function (res) {
            cb(res);
        }, function (err) {
            console.log(err);
        });
    }

    this.getDirections = function (cb) {
        var Directions = $resource(prefix + 'api/directions');
        var directions = Directions.query(function (res) {
            cb(res);
        }, function (err) {
            console.log(err);
        });
    }
}


var app = require('../angular-app');

app.service('createUserService', createUserService);

function createUserService($resource) {
    var vm = this;

    //cut path for get correct path in server (profile/newuser/ -> 'profile/')
    vm.prefix = window.location.pathname;
    vm.prefix = vm.prefix.substr(0, 9);

    this.createUser = function (user, cv, pdp, cb) {
        $resource(vm.prefix + '/api/cvs').save(cv, function (cvRez) {
            user.userCV = cvRez.id;
            $resource(vm.prefix + '/api/pdps').save(pdp, function (pdpRez) {
                user.userPDP = pdpRez.id;
                $resource(vm.prefix + '/api/users').save(user, function (userRez) {
                    console.log(userRez);
                    cb(userRez);
                });
            });
        });
    };

    this.getPositions = function (cb) {
        var Positions = $resource(vm.prefix + '/api/positions');
        var positions = Positions.query(function (res) {
            cb(res);
        }, function (err) {
            console.log(err);
        });
    }

    this.getDirections = function (cb) {
        var Directions = $resource(vm.prefix + '/api/directions');
        var directions = Directions.query(function (res) {
            cb(res);
        }, function (err) {
            console.log(err);
        });
    }
}


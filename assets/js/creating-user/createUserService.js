var app = require('../angular-app');

app.service('createUserService', createUserService);

function createUserService($resource) {

    var prefix = window.location.pathname;
    prefix = prefix.substr(prefix.length,8);
    console.log('prefix' + prefix);

    this.get = function(suid, cb){
        $resource(prefix + '/api/users/?serverUserId=:id', {id: suid}).query(function (users) {
            console.log(users);
            cb(users.length ? users[0] : null);
        })
    };
    this.create = function (user, cv, pdp, cb) {
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
}


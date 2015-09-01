var app = require('../angular-app');

app.service('UserProfilePublicService', UserProfilePublicService);

function UserProfilePublicService($resource) {
    var prefix = window.location.pathname;
    this.get = function(id, cb) {
        $resource(prefix + 'api/users/:id', {id: id}).get(function (user) {
            cb(user);
        });
    };
}
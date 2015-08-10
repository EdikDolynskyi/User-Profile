var app = require('../angular-app');

app.service('UserProfileService', UserProfileService);

function UserProfileService($resource) {
    this.get = function(id, cb) {
        $resource('/api/users/:id', {id: id}).get(function (user) {
            user.birthday = new Date(user.birthday);
            cb(user);
        });
    };
    this.update = function(user, cb) {
        $resource('/api/users/:id', null, {
            'update': { method:'PUT' }
        }).update({id: user.id}, user, cb);
    }
}
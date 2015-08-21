var app = require('../angular-app');

app.service('UserProfileService', UserProfileService);

function UserProfileService($resource) {
    this.get = function(cb) {
        var Users = $resource('/api/users/:id', {id: '@id'});
        Users.get({id: '55c38b5a956240ba4c6a5f24'}, function (user) {
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
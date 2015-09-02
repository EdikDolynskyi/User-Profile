var app = require('../angular-app');

app.service('UserProfilePublicService', UserProfilePublicService);

function UserProfilePublicService($resource) {
    var prefix = window.location.pathname;
    this.get = function(id, cb) {
        $resource(prefix + 'api/users/:id', {id: id}).get(function (user) {
            cb(user);
        });
    };
    this.getByServerUserId = function(suid, cb) {
        $resource(prefix + 'api/users/?serverUserId=:id', {id: suid}).query(function (users) {
            cb(users.length ? users[0] : null);
        })
    };
}
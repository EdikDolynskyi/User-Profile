var app = require('../angular-app');

app.service('UserProfileService', UserProfileService);

function UserProfileService($resource) {
    var prefix = window.location.pathname;

    this.get = function (id, cb) {
        $resource(prefix + 'api/users/:id', {id: id}).get(function (user) {

            user.birthday = new Date(user.birthday);

            cb(user);
        });
    };

    this.update = function (user, cb) {
        $resource(prefix + 'api/users/:id', null, {
            'update': {method: 'PUT'}
        }).update({id: user.id}, user, cb);
    };

    this.getAvatarUrl = function (filename) {
        return prefix + 'api/files/get/' + filename;
    };

    this.getByServerUserId = function(suid, cb) {
        $resource(prefix + 'api/users/?serverUserId=:id', {id: suid}).query(function (users) {
            cb(users.length ? users[0] : null);
        })
    };

    this.addLog = function (userId, data, cb) {
        $resource(prefix + 'api/logs/?userId=:userId', {userId: userId}).query(function (log) {

            if (log.length == 0) {
                data.original = [data.original];
                data.changes = [data.changes];
                data.owner = [data.owner];
                data.date = [data.date];
                data.userId = userId;

                $resource(prefix + 'api/logs/').save(data, function (response) {
                    cb(response);
                });
            }
            else {
                var userLog = angular.copy(log[0]);
                userLog.original.push(data.original);
                userLog.changes.push(data.changes);
                userLog.owner.push(data.owner);
                userLog.date.push(data.date);

                $resource(prefix + 'api/logs/:id', null, {
                    'update': {method: 'PUT'}
                }).update({id: userLog.id}, userLog, cb);
            }
        });
    };
}


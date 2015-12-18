var app = require('../angular-app');

app.service('UserProfileService', UserProfileService);

function UserProfileService($resource, prefix) {

    this.get = function (id, cb) {
        $resource(prefix + '/api/users/:id', {id: id}).get(function (user) {

            user.birthday = new Date(user.birthday);
            user.workDate = new Date(user.workDate);

            cb(user);
        });
    };

    this.update = function (user, cb) {
        $resource(prefix + '/api/users/:id', null, {
            'update': {method: 'PUT'}
        }).update({id: user.id}, user, cb);
    };

    this.getAvatarUrl = function (filename) {
        return prefix + '/api/files/get/' + filename;
    };

    this.getByServerUserId = function(suid, cb) {
        $resource(prefix + '/api/users/?serverUserId=:id', {id: suid}).query(function (users) {
            cb(users.length ? users[0] : null);
        })
    };

    this.addLog = function (userId, data, cb) {
        $resource(prefix + '/api/logs/?userId=:userId', {userId: userId}).query(function (log) {

            if (log.length == 0) {
                data.original = [data.original];
                data.changes = [data.changes];
                data.owner = [data.owner];
                data.date = [data.date];
                data.userId = userId;

                $resource(prefix + '/api/logs/').save(data, function (response) {
                    cb(response);
                });
            }
            else {
                var userLog = angular.copy(log[0]);
                userLog.original.push(data.original);
                userLog.changes.push(data.changes);
                userLog.owner.push(data.owner);
                userLog.date.push(data.date);

                $resource(prefix + '/api/logs/:id', null, {
                    'update': {method: 'PUT'}
                }).update({id: userLog.id}, userLog, cb);
            }
        });
    };

    this.getChangesFields = function (preModeration, original, edited, dataInFields){
        var result = angular.copy(preModeration);
        var oldUserData = {};
        var isChanged = false;
        for (var key in dataInFields) {
            if (original[key] !== edited[key]) {
                
                isChanged = true;
                if(!preModeration.hasOwnProperty(key)){
                    result[key] = angular.copy(original[key]);
                    oldUserData[key] = angular.copy(edited[key]);
                }
            }
        }
        return {
            changes: result,
            oldUserData: oldUserData,
            isChanged: isChanged
        };
    };

    this.validateForm = function(form){
        var validForm = form.userName.$valid && form.userSurname.$valid && form.userBirthday.$valid && form.startWork.$valid;
        return validForm;
    }
}


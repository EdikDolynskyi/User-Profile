var app = require('../angular-app');

app.service('UserProfileService', UserProfileService);

function UserProfileService($resource) {
    this.get = function (id, cb) {
        $resource('/api/users/:id', {id: id}).get(function (user) {
            user.birthday = new Date(user.birthday);
            cb(user);
        });
    };
    this.update = function (user, cb) {
        $resource('/api/users/:id', null, {
            'update': {method: 'PUT'}
        }).update({id: user.id}, user, cb);
    };
    this.getAvatarUrl = function (filename) {
        return '/api/files/get/' + filename;
    };

    this.addLog = function (userId, data, cb) {
        $resource('/api/logs/?userId=:userId', {userId: userId}).query(function (log) {


            if(log.length == 0){
                data.original = [data.original];
                data.changes = [data.changes];
                data.owner = [data.owner];
                data.date = [data.date];
                data.userId = userId;

                $resource('/api/logs/').save(data, function (response) {
                    cb(response);
                });

            }
            else {
                var userLog = angular.copy(log[0]);
                userLog.original.push(data.original);
                userLog.changes.push(data.changes);
                userLog.owner.push(data.owner);
                userLog.date.push(data.date);

                $resource('/api/logs/:id', null, {
                    'update': {method: 'PUT'}
                }).update({id: userLog.id}, userLog, cb);
            }

        });

    };
}


///* 1 */
//{
//    "_id" : ObjectId("55d894ee1f62ba6c0f1121bd"),
//    "original" : [
//    {
//        "name" : "Andrey"
//    },
//    {
//        "name" : "Andrey",
//        "surname" : "Dudka"
//    }
//],
//    "changes" : [
//    {
//        "name" : "Bob"
//    },
//    {
//        "name" : "Nick",
//        "surname" : "Jain"
//    }
//],
//    "userId" : "55c38b5a956240ba4c6a5f24",
//    "owner" : [
//    {
//        "name" : "Edik"
//    },
//    {
//        "name" : "Edik"
//    }
//],
//    "date" : [
//    {
//        "date" : "10.08.15"
//    },
//    {
//        "date" : "10.08.15"
//    }
//],
//    "isDeleted" : false,
//    "createdAt" : ISODate("2015-08-22T15:27:42.231Z"),
//    "updatedAt" : ISODate("2015-08-22T15:28:15.329Z")
//}
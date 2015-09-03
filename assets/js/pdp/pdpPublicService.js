(function () {
    var app = angular.module('myApp');

    app.factory('PdpPublicService', function($resource){

        var prefix = window.location.pathname;

        var service = {
            getPDP:getPDP,
            getByServerUserId: getByServerUserId,
            getPositions:getPositions,
            getDirections: getDirections,
            getTechnologies:getTechnologies,
            getCertifications:getCertifications,
            getTests:getTests,
            getAchievements: getAchievements
        };
        return service;

        function getPDP(userId, callback) {

            $resource(prefix + 'api/users/:id', {id: userId}).get(function (user) {
                console.log(user.userPDP.id);
                var userPDP = {};
                $resource(prefix + 'getpdp/:id', {id: user.userPDP.id}).get(function (resPDP) {
                    userPDP = resPDP;
                    console.log(resPDP);
                    callback(userPDP);

                }, function (err) {
                    console.log(err);
                });
            });
        }

        function getByServerUserId(suid, cb) {
            $resource(prefix + 'api/users/?serverUserId=:id', {id: suid}).query(function (users) {
                cb(users.length ? users[0] : null);
            })
        };

        function getAchievements(callback){
            var Achievements = $resource(prefix + 'api/achievements');
            var achs = Achievements.query(function(res){
                callback(res);
            }, function(err){
                console.log(err);
            });
        };

        function getPositions(callback){
            var Positions = $resource(prefix + 'api/positions');
            var positions = Positions.query(function(res){
                callback(res);
            }, function(err){
                console.log(err);
            });
        }

        function getDirections(callback){
            var Directions = $resource(prefix + 'api/directions');
            var directions = Directions.query(function(res){
                callback(res);
            }, function(err){
                console.log(err);
            });
        }

        function getTechnologies(callback){
            var Technologies = $resource(prefix + 'api/technologies');
            var technologies = Technologies.query(function(res){
                callback(res);
            }, function(err){
                console.log(err);
            });
        }

        function getCertifications(callback){
            var Certifications = $resource(prefix + 'api/certifications');
            var certifications = Certifications.query(function(res){
                callback(res);
            }, function(err){
                console.log(err);
            });
        }

        function getTests(callback){
            var Tests = $resource(prefix + 'api/tests');
            var tests = Tests.query(function(res){
                callback(res);
            }, function(err){
                console.log(err);
            });
        }
    });

})();
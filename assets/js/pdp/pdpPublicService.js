(function () {
    var app = angular.module('myApp');

    app.factory('PdpPublicService', function($resource, $rootScope){
        var service = {
            getPDP:getPDP,
            getPositions:getPositions,
            getDirections: getDirections,
            getTechnologies:getTechnologies,
            getCertifications:getCertifications,
            getTests:getTests,
            getAchievements: getAchievements
        };
        return service;

        function getPDP(callback, $rootScope){
            var userPDP = {};
            var userId = $rootScope.userId;
            var Pdps = $resource('/getpdp/:id', {id: '@id'})
            var pdp = Pdps.get({id: '55c3906d7533125308baafa2'}, function(resPDP){
                userPDP = resPDP;
                callback(userPDP);
            }, function(err){
                console.log(err);
            });
        }

        function getAchievements(callback){
            var Achievements = $resource('/api/achievements');
            var achs = Achievements.query(function(res){
                callback(res);
            }, function(err){
                console.log(err);
            });
        };

        function getPositions(callback){
            var Positions = $resource('/api/positions');
            var positions = Positions.query(function(res){
                callback(res);
            }, function(err){
                console.log(err);
            });
        }

        function getDirections(callback){
            var Directions = $resource('/api/directions');
            var directions = Directions.query(function(res){
                callback(res);
            }, function(err){
                console.log(err);
            });
        }

        function getTechnologies(callback){
            var Technologies = $resource('/api/technologies');
            var technologies = Technologies.query(function(res){
                callback(res);
            }, function(err){
                console.log(err);
            });
        }

        function getCertifications(callback){
            var Certifications = $resource('/api/certifications');
            var certifications = Certifications.query(function(res){
                callback(res);
            }, function(err){
                console.log(err);
            });
        }

        function getTests(callback){
            var Tests = $resource('/api/tests');
            var tests = Tests.query(function(res){
                callback(res);
            }, function(err){
                console.log(err);
            });
        }
    });
})();
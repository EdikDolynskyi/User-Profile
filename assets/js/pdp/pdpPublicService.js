(function () {
    var app = angular.module('myApp');

    app.factory('PdpPublicService', function($resource){

        var prefix = window.location.pathname;

        var service = {
            getPDP:getPDP,
            updateTechnologies:updateTechnologies,
            updateCertifications:updateCertifications,
            updateTasks: updateTasks,
            updateTests: updateTests,
            getPositions:getPositions,
            getDirections: getDirections,
            getTechnologies:getTechnologies,
            getCertifications:getCertifications,
            getTests:getTests,
            addTechnology: addTechnology,
            removeTechnology: removeTechnology,
            addCertification: addCertification,
            removeCertification: removeCertification,
            addTest: addTest,
            removeTest: removeTest,
            updatePosition: updatePosition,
            updateDirection: updateDirection,
            addTask:addTask,
            removeTask:removeTask,
            addAchievement: addAchievement,
            removeAchievement: removeAchievement,
            getAchievements: getAchievements,
            addCompletedCertification: addCompletedCertification,
            removeCompletedCertification: removeCompletedCertification
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

        function addCompletedCertification(obj){
            var Pdps = $resource(prefix + 'addcompcert/:id', {id: '@id'}, {'update': { method:'PUT' }});
            var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj)
        }

        function removeCompletedCertification(obj){
            var Pdps = $resource(prefix + 'removecompcert/:id', {id: '@id'}, {'update': { method:'PUT' }});
            var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj)
        }

        function addAchievement(obj){
            var Pdps = $resource(prefix + 'addach/:id', {id: '@id'}, {'update': { method:'PUT' }});
            var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj)
        }

        function removeAchievement(obj){
            var Pdps = $resource(prefix + 'removeach/:id', {id: '@id'}, {'update': { method:'PUT' }});
            var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj)
        }

        function addTask(obj){
            var Pdps = $resource(prefix + 'addtask/:id', {id: '@id'}, {'update': { method:'PUT' }});
            var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj);
        }

        function removeTask(obj){
            var Pdps = $resource(prefix + 'removetask/:id', {id: '@id'}, {'update': { method:'PUT' }});
            var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj)
        }

        function addTechnology(obj){
            var Pdps = $resource(prefix + 'addtech/:id', {id: '@id'}, {'update': { method:'PUT' }});
            var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj);
        }

        function removeTechnology(obj){
            var Pdps = $resource(prefix + 'removetech/:id', {id: '@id'}, {'update': { method:'PUT' }});
            var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj)
        }

        function addCertification(obj){
            var Pdps = $resource(prefix + 'addcert/:id', {id: '@id'}, {'update': { method:'PUT' }});
            var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj);
        }

        function removeCertification(obj){
            var Pdps = $resource(prefix + 'removecert/:id', {id: '@id'}, {'update': { method:'PUT' }});
            var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj)
        }

        function addTest(obj){
            var Pdps = $resource(prefix + 'addtest/:id', {id: '@id'}, {'update': { method:'PUT' }});
            var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj);
        }

        function removeTest(obj){
            var Pdps = $resource(prefix + 'removetest/:id', {id: '@id'}, {'update': { method:'PUT' }});
            var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj)
        }

        function updatePosition(obj){
            var Pdps = $resource(prefix + 'updatepos/:id', {id: '@id'}, {'update': { method:'PUT' }});
            var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj);
        }

        function updateDirection(obj){
            var Pdps = $resource(prefix + 'updatedir/:id', {id: '@id'}, {'update': { method:'PUT' }});
            var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj);
        }

        function updateTechnologies(obj){
            var Pdps = $resource(prefix + 'updatetech/:id', {id: '@id'}, {'update': { method:'PUT' }});
            var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj);
        }

        function updateCertifications(obj){
            var Pdps = $resource(prefix + 'updatecert/:id', {id: '@id'}, {'update': { method:'PUT' }});
            var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj);
        }

        function updateTasks(obj){
            var Pdps = $resource(prefix + 'updatetask/:id', {id: '@id'}, {'update': { method:'PUT' }});
            var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj);
        }

        function updateTests(obj){
            var Pdps = $resource(prefix + 'updatetest/:id', {id: '@id'}, {'update': { method:'PUT' }});
            var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj);
        }
    });

})();
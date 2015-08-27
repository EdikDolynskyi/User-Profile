(function () {
    var app = angular.module('myApp');

    app.factory('PdpPublicService', function ($resource) {
        var service = {
            getPDP: getPDP,
            updateTechnologies: updateTechnologies,
            updateCertifications: updateCertifications,
            updateTasks: updateTasks,
            updateTests: updateTests,
            getPositions: getPositions,
            getDirections: getDirections,
            getTechnologies: getTechnologies,
            getCertifications: getCertifications,
            getTests: getTests,
            addTechnology: addTechnology,
            removeTechnology: removeTechnology,
            addCertification: addCertification,
            removeCertification: removeCertification,
            addTest: addTest,
            removeTest: removeTest,
            updatePosition: updatePosition,
            updateDirection: updateDirection,
            addTask: addTask,
            removeTask: removeTask,
            addAchievement: addAchievement,
            removeAchievement: removeAchievement,
            getAchievements: getAchievements,
            addCompletedCertification: addCompletedCertification,
            removeCompletedCertification: removeCompletedCertification
        };
        return service;

        function getPDP(userId, callback) {

            $resource('/api/users/:id', {id: userId}).get(function (user) {
                console.log(user.userPDP.id);
                var userPDP = {};
                $resource('/getpdp/:id', {id: user.userPDP.id}).get(function (resPDP) {
                    userPDP = resPDP;
                    console.log(resPDP);
                    callback(userPDP);

                }, function (err) {
                    console.log(err);
                });
            });
        }

        function getAchievements(callback) {
            var Achievements = $resource('/api/achievements');
            var achs = Achievements.query(function (res) {
                callback(res);
            }, function (err) {
                console.log(err);
            });
        };

        function getPositions(callback) {
            var Positions = $resource('/api/positions');
            var positions = Positions.query(function (res) {
                callback(res);
            }, function (err) {
                console.log(err);
            });
        }

        function getDirections(callback) {
            var Directions = $resource('/api/directions');
            var directions = Directions.query(function (res) {
                callback(res);
            }, function (err) {
                console.log(err);
            });
        }

        function getTechnologies(callback) {
            var Technologies = $resource('/api/technologies');
            var technologies = Technologies.query(function (res) {
                callback(res);
            }, function (err) {
                console.log(err);
            });
        }

        function getCertifications(callback) {
            var Certifications = $resource('/api/certifications');
            var certifications = Certifications.query(function (res) {
                callback(res);
            }, function (err) {
                console.log(err);
            });
        }

        function getTests(callback) {
            var Tests = $resource('/api/tests');
            var tests = Tests.query(function (res) {
                callback(res);
            }, function (err) {
                console.log(err);
            });
        }

        function addCompletedCertification(obj) {
            var Pdps = $resource('/addcompcert/:id', {id: '@id'}, {'update': {method: 'PUT'}});
            var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj)
        }

        function removeCompletedCertification(obj) {
            var Pdps = $resource('/removecompcert/:id', {id: '@id'}, {'update': {method: 'PUT'}});
            var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj)
        }

        function addAchievement(obj) {
            var Pdps = $resource('/addach/:id', {id: '@id'}, {'update': {method: 'PUT'}});
            var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj)
        }

        function removeAchievement(obj) {
            var Pdps = $resource('/removeach/:id', {id: '@id'}, {'update': {method: 'PUT'}});
            var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj)
        }

        function addTask(obj) {
            var Pdps = $resource('/addtask/:id', {id: '@id'}, {'update': {method: 'PUT'}});
            var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj);
        }

        function removeTask(obj) {
            var Pdps = $resource('/removetask/:id', {id: '@id'}, {'update': {method: 'PUT'}});
            var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj)
        }

        function addTechnology(obj) {
            var Pdps = $resource('/addtech/:id', {id: '@id'}, {'update': {method: 'PUT'}});
            var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj);
        }

        function removeTechnology(obj) {
            var Pdps = $resource('/removetech/:id', {id: '@id'}, {'update': {method: 'PUT'}});
            var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj)
        }

        function addCertification(obj) {
            var Pdps = $resource('/addcert/:id', {id: '@id'}, {'update': {method: 'PUT'}});
            var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj);
        }

        function removeCertification(obj) {
            var Pdps = $resource('/removecert/:id', {id: '@id'}, {'update': {method: 'PUT'}});
            var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj)
        }

        function addTest(obj) {
            var Pdps = $resource('/addtest/:id', {id: '@id'}, {'update': {method: 'PUT'}});
            var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj);
        }

        function removeTest(obj) {
            var Pdps = $resource('/removetest/:id', {id: '@id'}, {'update': {method: 'PUT'}});
            var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj)
        }

        function updatePosition(obj) {
            var Pdps = $resource('/updatepos/:id', {id: '@id'}, {'update': {method: 'PUT'}});
            var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj);
        }

        function updateDirection(obj) {
            var Pdps = $resource('/updatedir/:id', {id: '@id'}, {'update': {method: 'PUT'}});
            var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj);
        }

        function updateTechnologies(obj) {
            var Pdps = $resource('/updatetech/:id', {id: '@id'}, {'update': {method: 'PUT'}});
            var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj);
        }

        function updateCertifications(obj) {
            var Pdps = $resource('/updatecert/:id', {id: '@id'}, {'update': {method: 'PUT'}});
            var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj);
        }

        function updateTasks(obj) {
            var Pdps = $resource('/updatetask/:id', {id: '@id'}, {'update': {method: 'PUT'}});
            var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj);
        }

        function updateTests(obj) {
            var Pdps = $resource('/updatetest/:id', {id: '@id'}, {'update': {method: 'PUT'}});
            var pdp = Pdps.update({id: '55c3906d7533125308baafa2'}, obj);
        }
    });

})();
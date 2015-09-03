var app = require('../angular-app');

app.controller('PdpPublicController', function ($scope, $modal, $location, $rootScope, $route, PdpPublicService) {
    var vm = this;
    var userPdpId = '';
    vm.userPDP = {};
    vm.positions = [];
    vm.directions = [];
    vm.technologies = [];
    vm.achievements = [];
    vm.certifications = [];
    vm.tests = [];
    vm.taskInput = true;
    activate();

    function activate(){
        //var userId = $location.path().split("/")[2];
        var userId = '';

        var serverId = $route.current.params.serverId;
        if (serverId) {
            PdpPublicService.getByServerUserId(serverId, function (user) {
                $rootScope.userId = user.id;
                userId = $rootScope.userId;

                PdpPublicService.getPDP(userId,function(obj){
                    vm.userPDP = obj;
                    userPdpId = obj.id;
                    console.log(obj);
                });
                PdpPublicService.getPositions(function(array){
                    vm.positions = array;
                });
                PdpPublicService.getDirections(function(array){
                    vm.directions = array;
                });
                PdpPublicService.getTechnologies(function(array){
                    vm.technologies = array;
                });
                PdpPublicService.getCertifications(function(array){
                    vm.certifications = array;
                });
                PdpPublicService.getTests(function(array){
                    vm.tests = array;
                });
                PdpPublicService.getAchievements(function(array){
                    vm.achievements = array;
                });
            });

        } else {
            userId = $route.current.params.userId;
            $rootScope.userId = userId;

            PdpPublicService.getPDP(userId,function(obj){
                vm.userPDP = obj;
                userPdpId = obj.id;
                console.log(obj);
            });
            PdpPublicService.getPositions(function(array){
                vm.positions = array;
            });
            PdpPublicService.getDirections(function(array){
                vm.directions = array;
            });
            PdpPublicService.getTechnologies(function(array){
                vm.technologies = array;
            });
            PdpPublicService.getCertifications(function(array){
                vm.certifications = array;
            });
            PdpPublicService.getTests(function(array){
                vm.tests = array;
            });
            PdpPublicService.getAchievements(function(array){
                vm.achievements = array;
            });
        }
    }

    vm.status = {
        isCertificationsOpen: true,
        isAchievementsOpen: true,
        isStepsOpen: true
    };

});
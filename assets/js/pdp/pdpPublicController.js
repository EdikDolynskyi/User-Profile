var app = require('../angular-app');

app.controller('PdpPublicController', function ($scope, $modal, $location, $rootScope, $route, PdpService, UserProfileService) {
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
            UserProfileService.getByServerUserId(serverId, function (user) {
                $rootScope.userId = user.id;
                userId = $rootScope.userId;

                PdpService.getPDP(userId,function(obj){
                    vm.userPDP = obj;
                    userPdpId = obj.id;
                    console.log(obj);
                });
                PdpService.getPositions(function(array){
                    vm.positions = array;
                });
                PdpService.getDirections(function(array){
                    vm.directions = array;
                });
                PdpService.getTechnologies(function(array){
                    vm.technologies = array;
                });
                PdpService.getCertifications(function(array){
                    vm.certifications = array;
                });
                PdpService.getTests(function(array){
                    vm.tests = array;
                });
                PdpService.getAchievements(function(array){
                    vm.achievements = array;
                });
            });

        } else {
            userId = $route.current.params.userId;
            $rootScope.userId = userId;

            PdpService.getPDP(userId,function(obj){
                vm.userPDP = obj;
                userPdpId = obj.id;
                console.log(obj);
            });
            PdpService.getPositions(function(array){
                vm.positions = array;
            });
            PdpService.getDirections(function(array){
                vm.directions = array;
            });
            PdpService.getTechnologies(function(array){
                vm.technologies = array;
            });
            PdpService.getCertifications(function(array){
                vm.certifications = array;
            });
            PdpService.getTests(function(array){
                vm.tests = array;
            });
            PdpService.getAchievements(function(array){
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
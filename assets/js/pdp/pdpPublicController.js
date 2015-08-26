var app = require('../angular-app');

app.controller('PdpPublicController', function ($scope, $modal, PdpPublicService) {
    var vm = this;
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
        PdpPublicService.getPDP(function(obj){
            vm.userPDP = obj;
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



    vm.status = {
        isCertificationsOpen: true,
        isAchievementsOpen: true,
        isStepsOpen: true
    };

});
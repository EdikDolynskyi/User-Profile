var app = require('../angular-app');

app.controller('PdpPublicController', function ($scope, $modal, $location, PdpPublicService) {
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
        var userId = $location.path().split("/")[2];

        PdpPublicService.getPDP(userId,function(obj){
            vm.userPDP = obj;
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
    };

    vm.addAchievement = function () {
        var modalInstance = $modal.open({
            templateUrl: 'modalPdpContent.html',
            controller: 'ModalPdpCtrl',
            controllerAs: 'modalpdp',
            resolve: {
                achievements: function() {
                    return vm.achievements;
                }
            }
        });

        modalInstance.result.then(function (addedAchievement) {
            PdpPublicService.addAchievement(addedAchievement);
            vm.userPDP.achievements.push(addedAchievement);
        });
    };

    vm.removeAchievement = function(obj){
        var index = vm.userPDP.achievements.indexOf(obj);
        vm.userPDP.achievements.splice(index, 1);
        PdpPublicService.removeAchievement(obj);
    };

    vm.addTask = function(){
        var newObj = {};
        newObj.completed = false;
        newObj.name = vm.newTask;
        PdpPublicService.addTask(newObj);
        vm.userPDP.tasks.push(newObj);
        vm.newTask = '';
        vm.taskInput = true;
    };

    vm.removeTask = function(obj){
        var index = vm.userPDP.tasks.indexOf(obj);
        vm.userPDP.tasks.splice(index, 1);
        PdpPublicService.removeTask(obj);
    };

    vm.addTechnology = function(obj){
        var newObj = obj;
        newObj.completed = false;
        PdpPublicService.addTechnology(newObj);
        vm.userPDP.technologies.push(newObj);
    };
    vm.removeTechnology = function(obj){
        var index = vm.userPDP.technologies.indexOf(obj);
        vm.userPDP.technologies.splice(index, 1);
        PdpPublicService.removeTechnology(obj);
    };
    vm.addCertification = function(obj){
        var newObj = obj;
        newObj.completed = false;
        PdpPublicService.addCertification(newObj);
        vm.userPDP.certifications.push(newObj);
    };
    vm.removeCertification = function(obj){
        var index = vm.userPDP.certifications.indexOf(obj);
        vm.userPDP.certifications.splice(index, 1);
        PdpPublicService.removeCertification(obj);
    };
    vm.addTest = function(obj){
        var newObj = obj;
        newObj.completed = false;
        PdpPublicService.addTest(newObj);
        vm.userPDP.tests.push(newObj);
    };
    vm.removeTest = function(obj){
        var index = vm.userPDP.tests.indexOf(obj);
        vm.userPDP.tests.splice(index, 1);
        PdpPublicService.removeTest(obj);
    };
    vm.updatePosition = function(obj){
        PdpPublicService.updatePosition(obj);
        vm.userPDP.position.name = obj.name;
    };
    vm.updateDirection = function(obj){
        PdpPublicService.updateDirection(obj);
        vm.userPDP.direction.name = obj.name;
    };
    vm.updateTasks = function(obj){
        PdpPublicService.updateTasks(obj);
    };
    vm.updateTechnologies = function(obj){
        PdpPublicService.updateTechnologies(obj);
    };
    vm.updateTests = function(obj){
        PdpPublicService.updateTests(obj);
    };
    vm.updateCertifications = function(obj){
        PdpPublicService.updateCertifications(obj);
    };

    vm.addCompletedCertification = function (){
        var modalInstance = $modal.open({
            templateUrl: 'modalPdpCertification.html',
            controller: 'ModalPdpCertController',
            controllerAs: 'modalpdpcert',
            resolve: {
                certifications: function() {
                    return vm.certifications;
                }
            }
        });

        modalInstance.result.then(function (addedCertification) {
            PdpPublicService.addCompletedCertification(addedCertification);
            vm.userPDP.completedCertifications.push(addedCertification);
        });
    };

    vm.removeCompletedCertification = function(obj){
        var index = vm.userPDP.completedCertifications.indexOf(obj);
        vm.userPDP.completedCertifications.splice(index, 1);
        PdpPublicService.removeCompletedCertification(obj);
    };


    vm.status = {
        isCertificationsOpen: true,
        isAchievementsOpen: true,
        isStepsOpen: true
    };

});
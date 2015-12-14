var app = require('../angular-app');

app.controller('PdpController', function ($scope, $modal, $rootScope, PdpService) {
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
        var userId = $rootScope.ownerId;


        PdpService.getPDP(userId, function(obj){
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
                PdpService.addAchievement(addedAchievement, userPdpId);
                vm.userPDP.achievements.push(addedAchievement);
          });
    };  

    vm.removeAchievement = function(obj){
        var index = vm.userPDP.achievements.indexOf(obj);
        vm.userPDP.achievements.splice(index, 1);
        PdpService.removeAchievement(obj, userPdpId);
    };

    vm.addTask = function(){
        var newObj = {};
        newObj.completed = false;
        newObj.name = vm.newTask;
        PdpService.addTask(newObj);
        vm.userPDP.tasks.push(newObj);
        vm.newTask = '';
        vm.taskInput = true;
    };

    vm.removeTask = function(obj){
        var index = vm.userPDP.tasks.indexOf(obj);
        vm.userPDP.tasks.splice(index, 1);
        PdpService.removeTask(obj, userPdpId);
    };

    vm.addTechnology = function(obj){
        var newObj = obj;
        newObj.completed = false;
        PdpService.addTechnology(newObj, userPdpId);
        vm.userPDP.technologies.push(newObj);
    };
    vm.removeTechnology = function(obj){
        var index = vm.userPDP.technologies.indexOf(obj);
        vm.userPDP.technologies.splice(index, 1);
        PdpService.removeTechnology(obj, userPdpId);
    };
    vm.addCertification = function(obj){
        var newObj = obj;
        newObj.completed = false;
        PdpService.addCertification(newObj, userPdpId);
        vm.userPDP.certifications.push(newObj);
    };
    vm.removeCertification = function(obj){
        var index = vm.userPDP.certifications.indexOf(obj);
        vm.userPDP.certifications.splice(index, 1);
        PdpService.removeCertification(obj, userPdpId);
    };
    vm.addTest = function(obj){
        var newObj = obj;
        newObj.completed = false;
        PdpService.addTest(newObj, userPdpId);
        vm.userPDP.tests.push(newObj);
    };
    vm.removeTest = function(obj){
        var index = vm.userPDP.tests.indexOf(obj);
        vm.userPDP.tests.splice(index, 1);
        PdpService.removeTest(obj, userPdpId);
    };
    vm.updatePosition = function(obj){
        PdpService.updatePosition(obj, userPdpId);
        vm.userPDP.position.name = obj.name;
    };
    vm.updateDirection = function(obj){
        PdpService.updateDirection(obj, userPdpId);
        vm.userPDP.direction.name = obj.name;
    };
    vm.updateTasks = function(obj){
        PdpService.updateTasks(obj, userPdpId);
    };
    vm.updateTechnologies = function(obj){
        PdpService.updateTechnologies(obj, userPdpId);
    };
    vm.updateTests = function(obj){
        PdpService.updateTests(obj, userPdpId);
    };
    vm.updateCertifications = function(obj){
        PdpService.updateCertifications(obj, userPdpId);
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
                PdpService.addCompletedCertification(addedCertification);
                vm.userPDP.completedCertifications.push(addedCertification);
          });
    };
    
    vm.removeCompletedCertification = function(obj){
        var index = vm.userPDP.completedCertifications.indexOf(obj);
        vm.userPDP.completedCertifications.splice(index, 1);
        PdpService.removeCompletedCertification(obj, userPdpId);
    };


    vm.status = {
        isCertificationsOpen: true,
        isAchievementsOpen: true,
        isStepsOpen: true
    };

});
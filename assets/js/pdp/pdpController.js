(function () {
    var app = angular.module('myApp');

    app.controller('PdpController', function ($scope, PdpService) {
        var vm = this;    
        vm.userPDP = {};
        activate();
        
        vm.updateTasks = function(obj){
            PdpService.updateTasks(obj);
        };
        vm.updateTechnologies = function(obj){
            PdpService.updateTechnologies(obj);
        };
        vm.updateTests = function(obj){
            PdpService.updateTests(obj);
        };
        vm.updateCertifications = function(obj){
            PdpService.updateCertifications(obj);
        };

        function activate(){
            PdpService.getPDP(function(obj){
                vm.userPDP = obj;
            });
        };


        vm.status = {
            isCertificatesOpen: true,
            isAchievementsOpen: true,
            isStepsOpen: true
        };

    });


})();
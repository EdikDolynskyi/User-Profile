(function () {
    var app = angular.module('myApp');

    app.controller('PdpController', function ($scope, PdpService) {
        var vm = this;    
        vm.userPDP = {};

        activate();

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
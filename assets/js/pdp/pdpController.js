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

        vm.items = ['Item 1', 'Item 2', 'Item 3'];

        
        vm.status = {
            isCertificatesOpen: true,
            isAchievementsOpen: true,
            isStepsOpen: true
        };
        vm.achievements =  [
            {
                name: 'Some achievement',
                img: 'http://placehold.it/140x100'
            },
            {
                name: 'Some achievement',
                img: 'http://placehold.it/140x100'
            },
            {
                name: 'Some achievement',
                img: 'http://placehold.it/140x100'
            },
            {
                name: 'Some achievement',
                img: 'http://placehold.it/140x100'
            },
            {
                name: 'Some achievement',
                img: 'http://placehold.it/140x100'
            },
            {
                name: 'Some achievement',
                img: 'http://placehold.it/140x100'
            },
            {
                name: 'Some achievement',
                img: 'http://placehold.it/140x100'
            }
            
        ];


    });


})();
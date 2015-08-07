(function () {
    var app = angular.module('myApp');

    app.controller('PdpCtrl', function ($scope) {

        $scope.position = 'Junior Front-End Developer';

        $scope.items = ['Item 1', 'Item 2', 'Item 3'];

        $scope.status = {
            isPositionOpen: true,
            isAchievementsOpen: true,
            isStepsOpen: true
        };
        $scope.achievements =  [
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
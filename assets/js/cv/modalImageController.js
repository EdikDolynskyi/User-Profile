var app = require('../angular-app');

app.controller('ModalImageCtrl', function($scope, $modalInstance, selected, images) {
    $scope.images = images;
    $scope.image = {
        index: $scope.images.indexOf(selected)
    };
    $scope.number = $scope.images.length;

    $scope.cancel = function ($event) {
        $event.preventDefault();
        $modalInstance.dismiss('cancel');
    };
});


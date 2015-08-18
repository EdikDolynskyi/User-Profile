var app = require('../angular-app');

app.controller('ModalPdpCtrl', function ($modalInstance, achievements) {
    var vm = this;
    vm.achievements = achievements;
    vm.selected = vm.achievements[0];
    vm.selectAchievement = function(obj){
        vm.selected = obj;
    };

    vm.ok = function () {
        vm.selected.description = vm.description;
        $modalInstance.close(vm.selected);
    };

    vm.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
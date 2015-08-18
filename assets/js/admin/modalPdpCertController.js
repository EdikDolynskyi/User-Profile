var app = require('../angular-app');

app.controller('ModalPdpCertController', function ($modalInstance, certifications) {
    var vm = this;
    vm.certifications = certifications;
    vm.selected = vm.certifications[0];
    vm.selectCertification = function(obj){
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
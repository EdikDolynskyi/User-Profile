var app = require('../angular-app');

app.controller('ModalConfirmController', function ($modalInstance) {
	var vm = this;

    vm.ok = function () {
        $modalInstance.close(true);
    };

    vm.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
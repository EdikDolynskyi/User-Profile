var app = require('../angular-app');

app.controller('ModalCertController', function ($modalInstance, $resource, certification, certifications, uploadService) {
	var vm = this;
    vm.certifications = certifications;
    vm.certification = certification;
    vm.tmpSrc = certification.src;
    vm.tmpName = certification.name;

    vm.upload = function(file){
        uploadService.upload(file, function(fileSrc){
            vm.tmpSrc = fileSrc;
        });
    };

    vm.save = function () {
      vm.certification.src = vm.tmpSrc;
      vm.certification.name = vm.tmpName;
      $modalInstance.close(vm.certification);
    };

    vm.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    vm.delete = function (){
        var index = vm.certifications.indexOf(certification);
        var Certifications = $resource('/api/certifications/:id', {id: '@id'}, {'delete': { method:'DELETE' }});
        var cert = Certifications.delete({id: vm.certification.id}, function(res){
                console.log("Deleted successfully!")
            }, function(err){
                console.log(err);
            });

        vm.certifications.splice(index, 1);
        $modalInstance.dismiss('delete');
    };
});
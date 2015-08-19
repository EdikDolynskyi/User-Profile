var app = require('../angular-app');

app.controller('CertificationsController', function($resource, $timeout, $modal, uploadService ){
	var vm = this;
	vm.certifications = [];
    vm.categories = [];
    vm.certification = {};
    vm.certification.src = "/api/files/get/default-image.png";
	vm.isCollapsed = true;
	vm.showAlert = false;

    getCertifications();
    getCategories();

    function getCertifications(){
        var Certifications = $resource('/api/certifications');
        var cert = Certifications.query(function(res){
                vm.certifications = res;               
            }, function(err){
                console.log(err);
            });
    };

    function getCategories(){
        var Categories = $resource('/api/categories');
        var cat = Categories.query(function(res){
                vm.categories = res;
                vm.certification.category = vm.categories[0];               
            }, function(err){
                console.log(err);
            });
    };

    vm.open = function (obj) {
        var modalInstance = $modal.open({
          templateUrl: 'modalCertifications.html',
          controller: 'ModalCertController',
          controllerAs: 'modalcert',
          resolve: {
            certification: function () {
                return obj;
            },
            certifications: function() {
                return vm.certifications;
            },
            categories: function(){
                return vm.categories;
            }
        }
        });

        modalInstance.result.then(function (updatedCert) {
              var Certifications = $resource('/api/certifications/:id', {id: '@id'}, {'update': { method:'PUT' }});
              var cert = Certifications.update({id: updatedCert.id}, updatedCert);
          });
    };

	vm.createCertification = function(){
        var tmp = vm.certification.category;
        vm.certification.category = vm.certification.category.id;	
		var Certifications = $resource('/api/certifications', null, {'post': { method:'POST' }});
    	var cert = Certifications.post(vm.certification, function(newCert){
                newCert.category = tmp;
                vm.certifications.push(newCert);
            }, function(err){
                console.log(err);
            });
        
    	vm.certification = {};
        vm.certification.category = vm.categories[0];
        vm.certification.src = "/api/files/get/default-image.png";
    	vm.showAlert = true;
        vm.isCollapsed = true;
        $timeout( function() {vm.showAlert = false}, 5000);
	};

    vm.selectCategory = function(category){
        vm.certification.category = category;
    };

    vm.upload = function(file){
        uploadService.upload(file, function(fileSrc){
            vm.certification.src = fileSrc;
        });
    }

});

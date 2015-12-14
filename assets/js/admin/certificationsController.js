var app = require('../angular-app');

app.controller('CertificationsController', function($scope, $resource, $timeout, $modal, uploadService, downloadService){
	var vm = this;
    var prefix = window.location.pathname;
	vm.certifications = [];
    vm.categories = [];
    vm.certification = {};
    vm.certification.src = prefix + "api/files/get/default-image.png";
	vm.isCollapsed = true;
	vm.showAlert = false;
    vm.showUrlInput = false;

    getCertifications();
    getCategories();

    function getCertifications(){
        var Certifications = $resource(prefix + 'api/certifications');
        var cert = Certifications.query(function(res){
                vm.certifications = res;               
            }, function(err){
                console.log(err);
            });
    };

    function getCategories(){
        var Categories = $resource(prefix + 'api/categories');
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
              var Certifications = $resource(prefix + 'api/certifications/:id', {id: '@id'}, {'update': { method:'PUT' }});
              var cert = Certifications.update({id: updatedCert.id}, updatedCert);
          });
    };


    $scope.$watch(angular.bind(this, function () {
        return this.url;
    }), function(url) {
        if(url) {
           vm.certification.src = url;
        }
    });

	vm.createCertification = function(){
        var tmp = vm.certification.category;
        vm.certification.category = vm.certification.category.id;
        if(vm.url){
            var obj = {};
            obj.url = vm.certification.src;
            var pathArray = obj.url.split( '/' );
            var fileName = pathArray[pathArray.length-1];
            obj.fileName = './upload/' + fileName;

            downloadService.downloadFile(obj);
            vm.certification.src = prefix + 'api/files/get/' + fileName;
        }

		var Certifications = $resource(prefix + 'api/certifications', null, {'post': { method:'POST' }});
    	var cert = Certifications.post(vm.certification, function(newCert){
                newCert.category = tmp;
                vm.certifications.push(newCert);
            }, function(err){
                console.log(err);
            });
        
    	vm.certification = {};
        vm.certification.category = vm.categories[0];
        vm.certification.src = prefix + "api/files/get/default-image.png";
        vm.url = "";
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

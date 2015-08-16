var app = require('../angular-app');

app.controller('AchievementsController', function($resource, $timeout, $modal, uploadService ){
	var vm = this;
	vm.achievements = [];
    vm.achievement = {};
    vm.achievement.src = "/api/files/get/default-image.png";
	vm.isCollapsed = true;
	vm.showAlert = false;

    getAchievements();

    function getAchievements(){
        var Achievements = $resource('/api/achievements');
        var achs = Achievements.query(function(res){
                vm.achievements = res;               
            }, function(err){
                console.log(err);
            });
    };

    vm.open = function (obj) {
        var modalInstance = $modal.open({
          templateUrl: 'myModalContent.html',
          controller: 'ModalInstanceCtrl',
          controllerAs: 'modal',
          resolve: {
            achievement: function () {
                return obj;
            },
            achievements: function() {
                return vm.achievements;
            }
        }
        });

        modalInstance.result.then(function (updatedAch) {
              var Achievements = $resource('/api/achievements/:id', {id: '@id'}, {'update': { method:'PUT' }});
              var ach = Achievements.update({id: updatedAch.id}, updatedAch);
          });
    };

	vm.createAchievement = function(){	
		var Achievements = $resource('/api/achievements', null, {'post': { method:'POST' }});
    	var ach = Achievements.post(vm.achievement, function(newAch){
                vm.achievements.push(newAch);
            }, function(err){
                console.log(err);
            });
        
    	vm.achievement = {};
        vm.achievement.src = "/api/files/get/default-image.png";
    	vm.showAlert = true;
        vm.isCollapsed = true;
        $timeout( function() {vm.showAlert = false}, 5000);
	};

    vm.upload = function(file){
        uploadService.upload(file, function(fileSrc){
            vm.achievement.src = fileSrc;
        });
    }

});

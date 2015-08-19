var app = require('../angular-app');

app.controller('AchievementsController', function($resource, $timeout, $modal, uploadService ){
	var vm = this;
	vm.achievements = [];
    vm.achievement = {};
    vm.categories = [];
    vm.achievement.src = "/api/files/get/default-image.png";
	vm.isCollapsed = true;
	vm.showAlert = false;

    getAchievements();
    getCategories();

    function getAchievements(){
        var Achievements = $resource('/api/achievements');
        var achs = Achievements.query(function(res){
                vm.achievements = res;               
            }, function(err){
                console.log(err);
            });
    };
    function getCategories(){
        var Categories = $resource('/api/achievementcategories');
        var cat = Categories.query(function(res){
                vm.categories = res;
                vm.achievement.category = vm.categories[0];               
            }, function(err){
                console.log(err);
            });
    };

    vm.open = function (obj) {
        var modalInstance = $modal.open({
          templateUrl: 'modalAchievements.html',
          controller: 'ModalAchController',
          controllerAs: 'modalach',
          resolve: {
            achievement: function () {
                return obj;
            },
            achievements: function() {
                return vm.achievements;
            },
            categories: function(){
                return vm.categories;
            }
        }
        });

        modalInstance.result.then(function (updatedAch) {
              var Achievements = $resource('/api/achievements/:id', {id: '@id'}, {'update': { method:'PUT' }});
              var ach = Achievements.update({id: updatedAch.id}, updatedAch);
          });
    };

	vm.createAchievement = function(){
        var tmp = vm.achievement.category;
        vm.achievement.category = vm.achievement.category.id;	
		var Achievements = $resource('/api/achievements', null, {'post': { method:'POST' }});
    	var ach = Achievements.post(vm.achievement, function(newAch){
                newAch.category = tmp;
                vm.achievements.push(newAch);
            }, function(err){
                console.log(err);
            });
        
    	vm.achievement = {};
        vm.achievement.category = vm.achievement[0];
        vm.achievement.src = "/api/files/get/default-image.png";
    	vm.showAlert = true;
        vm.isCollapsed = true;
        $timeout( function() {vm.showAlert = false}, 5000);
	};

    vm.selectCategory = function(category){
        vm.achievement.category = category;
    };

    vm.upload = function(file){
        uploadService.upload(file, function(fileSrc){
            vm.achievement.src = fileSrc;
        });
    }

});

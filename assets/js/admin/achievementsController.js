var app = require('../angular-app');

app.controller('AchievementsController', function($scope, $resource, $timeout, $modal, uploadService, downloadService){
	var vm = this;
    var prefix = window.location.pathname;
	vm.achievements = [];
    vm.achievement = {};
    vm.categories = [];
    vm.achievement.src = prefix + "api/files/get/default-image.png";
	vm.isCollapsed = true;
	vm.showAlert = false;
    vm.showUrlInput = false;

    getAchievements();
    getCategories();

    function getAchievements(){
        var Achievements = $resource(prefix + 'api/achievements');
        var achs = Achievements.query(function(res){
                vm.achievements = res;               
            }, function(err){
                console.log(err);
            });
    }

    function getCategories(){
        var Categories = $resource(prefix + 'api/achievementcategories');
        var cat = Categories.query(function(res){
                vm.categories = res;
                vm.achievement.category = vm.categories[0];               
            }, function(err){
                console.log(err);
            });
    }

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
              var Achievements = $resource(prefix + 'api/achievements/:id', {id: '@id'}, {'update': { method:'PUT' }});
              var ach = Achievements.update({id: updatedAch.id}, updatedAch);
          });
    };

    $scope.$watch(angular.bind(this, function() {
        return this.url;
    }), function(url) {
        if(url) {
            vm.achievement.src = url;
        }
    });

	vm.createAchievement = function(){
        var tmp = vm.achievement.category;
        vm.achievement.category = vm.achievement.category.id;
        if(vm.url){
            var obj = {};
            obj.url = vm.achievement.src;
            var pathArray = obj.url.split( '/' );
            var fileName = pathArray[pathArray.length-1];
            obj.fileName = './upload/' + fileName;

            downloadService.downloadFile(obj);
            vm.achievement.src = prefix + 'api/files/get/' + fileName;
        }
		var Achievements = $resource(prefix + 'api/achievements', null, {'post': { method:'POST' }});
    	var ach = Achievements.post(vm.achievement, function(newAch){
                newAch.category = tmp;
                vm.achievements.push(newAch);
            }, function(err){
                console.log(err);
            });
        
    	vm.achievement = {};
        vm.achievement.category = vm.achievement[0];
        vm.achievement.src = prefix + "api/files/get/default-image.png";
        vm.url = "";
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

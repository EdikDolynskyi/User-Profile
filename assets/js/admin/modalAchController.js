var app = require('../angular-app');

app.controller('ModalAchController', function ($modalInstance, $resource, achievement, achievements, categories, uploadService) {
	var vm = this;
    var prefix = window.location.pathname;
    vm.achievements = achievements;
    vm.achievement = achievement;
    vm.categories = categories;
    vm.tmpSrc = achievement.src;
    vm.tmpName = achievement.name;
    vm.tmpCategory = achievement.category;

    vm.selectCategory = function(category){
        vm.tmpCategory = category;
    };

    vm.upload = function(file){
        uploadService.upload(file, function(fileSrc){
            vm.tmpSrc = fileSrc;
        });
    };

    vm.save = function () {
      vm.achievement.src = vm.tmpSrc;
      vm.achievement.name = vm.tmpName;
      vm.achievement.category = vm.tmpCategory;
      $modalInstance.close(vm.achievement);
    };

    vm.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    vm.delete = function (){
        var index = vm.achievements.indexOf(achievement);
        var Achievements = $resource(prefix + 'api/achievements/:id', {id: '@id'}, {'delete': { method:'DELETE' }});
        var ach = Achievements.delete({id: vm.achievement.id}, function(res){
                console.log("Deleted successfully!")
            }, function(err){
                console.log(err);
            });

        vm.achievements.splice(index, 1);
        $modalInstance.dismiss('delete');
    };
});
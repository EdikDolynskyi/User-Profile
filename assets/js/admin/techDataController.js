var app = require('../angular-app');

app.controller('TechDataController', function($resource , $timeout, $modal){
	var vm = this;
    var prefix = window.location.pathname;
    vm.positions = [];
    vm.position = {};
    vm.isPositionCollapsed = true;
    vm.positionAlert = false;
    vm.directions = [];
    vm.direction = {};
    vm.isDirectionCollapsed = true;
    vm.directionAlert = false;
    vm.techCategories = [];
    vm.techCategory = {};
    vm.isTechCategoryCollapsed = true;
    vm.techCategoryAlert = false;
    vm.achCategories = [];
    vm.achCategory = {};
    vm.isAchCategoryCollapsed = true;
    vm.achCategoryAlert = false;
    vm.technologies = [];
    vm.technology = {};
    vm.isTechnologyCollapsed = true;
    vm.technologyAlert = false;

    getPositions();
    getDirections();
    getTechCategories();
    getAchCategories();
    getTechnologies()

    function getPositions(){
        var Positions = $resource(prefix + 'api/positions');
        var pos = Positions.query(function(res){
                vm.positions = res;               
            }, function(err){
                console.log(err);
            });
    };

    function getDirections(){
        var Directions = $resource(prefix + 'api/directions');
        var dir = Directions.query(function(res){
                vm.directions = res;               
            }, function(err){
                console.log(err);
            });
    };

    function getTechCategories(){
        var Categories = $resource(prefix + 'api/categories');
        var cat = Categories.query(function(res){
                vm.techCategories = res;
                vm.technology.category = vm.techCategories[0];               
            }, function(err){
                console.log(err);
            });
    };

    function getAchCategories(){
        var Categories = $resource(prefix + 'api/achievementcategories');
        var cat = Categories.query(function(res){
                vm.achCategories = res;               
            }, function(err){
                console.log(err);
            });
    };

    function getTechnologies(){
        var Technologies = $resource(prefix + 'api/technologies');
        var tech = Technologies.query(function(res){
                vm.technologies = res;               
            }, function(err){
                console.log(err);
            });
    };

    vm.createPositionInCollection = function(){  
        var Positions = $resource(prefix + 'api/positions', null, {'post': { method:'POST' }});
        var pos = Positions.post(vm.position, function(newPos){
                vm.positions.push(newPos);
            }, function(err){
                console.log(err);
            });
        vm.position = {};
        vm.positionAlert = true;
        vm.isPositionCollapsed = true;
        $timeout( function() {vm.positionAlert = false}, 5000);
    };

    vm.updatePositionInCollection = function(position){
        var Positions = $resource(prefix + 'api/positions/:id', {id: '@id'}, {'update': { method:'PUT' }});
        var pos = Positions.update({id: position.id}, position);
    };

    vm.positionCancel = function(){
        vm.isPositionCollapsed = true;
        vm.position = {};
    };

    vm.removePositionFromCollection = function(obj){
        var tmp = false;
        modalConfirm(function(tmp){
            if(tmp){
                var index = vm.positions.indexOf(obj);
                vm.positions.splice(index, 1);
                var Positions = $resource(prefix + 'api/positions/:id', {id: '@id'}, {'delete': { method:'DELETE' }});
                var pos = Positions.delete({id: obj.id}, function(res){
                        console.log("Deleted successfully!")
                    }, function(err){
                        console.log(err);
                });
            }
        });
    };

    vm.createDirectionInCollection = function(){  
        var Directions = $resource(prefix + 'api/directions', null, {'post': { method:'POST' }});
        var dir = Directions.post(vm.direction, function(newDir){
                vm.directions.push(newDir);
            }, function(err){
                console.log(err);
            });
        vm.direction = {};
        vm.directionAlert = true;
        vm.isDirectionCollapsed = true;
        $timeout( function() {vm.directionAlert = false}, 5000);
    };

    vm.updateDirectionInCollection = function(direction){
        var Directions = $resource(prefix + 'api/directions/:id', {id: '@id'}, {'update': { method:'PUT' }});
        var dir = Directions.update({id: direction.id}, direction);
    };

    vm.directionCancel = function(){
        vm.isDirectionCollapsed = true;
        vm.direction = {};
    };

    vm.removeDirectionFromCollection = function(obj){
        var tmp = false;
        modalConfirm(function(tmp){
            if(tmp){
                var index = vm.directions.indexOf(obj);
                vm.directions.splice(index, 1);
                var Directions = $resource(prefix + 'api/directions/:id', {id: '@id'}, {'delete': { method:'DELETE' }});
                var dir = Directions.delete({id: obj.id}, function(res){
                        console.log("Deleted successfully!")
                    }, function(err){
                        console.log(err);
                });
            }
        });
    };

    vm.createTechCategoryInCollection = function(){  
        var Categories = $resource(prefix + 'api/categories', null, {'post': { method:'POST' }});
        var cat = Categories.post(vm.techCategory, function(newCat){
                vm.techCategories.push(newCat);
            }, function(err){
                console.log(err);
            });
        vm.techCategory = {};
        vm.techCategoryAlert = true;
        vm.isTechCategoryCollapsed = true;
        $timeout( function() {vm.techCategoryAlert = false}, 5000);
    };

    vm.updateTechCategoryInCollection = function(category){
        var Categories = $resource(prefix + 'api/categories/:id', {id: '@id'}, {'update': { method:'PUT' }});
        var cat = Categories.update({id: category.id}, category);
    };

    vm.techCategoryCancel = function(){
        vm.isTechCategoryCollapsed = true;
        vm.techCategory = {};
    };

    vm.removeTechCategoryFromCollection = function(obj){
        var tmp = false;
        modalConfirm(function(tmp){
            if(tmp){
                var index = vm.techCategories.indexOf(obj);
                vm.techCategories.splice(index, 1);
                var Categories = $resource(prefix + 'api/categories/:id', {id: '@id'}, {'delete': { method:'DELETE' }});
                var cat = Categories.delete({id: obj.id}, function(res){
                        console.log("Deleted successfully!")
                    }, function(err){
                        console.log(err);
                });
            }
        });
    };

    vm.createAchCategoryInCollection = function(){  
        var Categories = $resource(prefix + 'api/achievementcategories', null, {'post': { method:'POST' }});
        var cat = Categories.post(vm.achCategory, function(newCat){
                vm.achCategories.push(newCat);
            }, function(err){
                console.log(err);
            });
        vm.achCategory = {};
        vm.achCategoryAlert = true;
        vm.isAchCategoryCollapsed = true;
        $timeout( function() {vm.achCategoryAlert = false}, 5000);
    };

    vm.updateAchCategoryInCollection = function(category){
        var Categories = $resource(prefix + 'api/achievementcategories/:id', {id: '@id'}, {'update': { method:'PUT' }});
        var cat = Categories.update({id: category.id}, category);
    };

    vm.achCategoryCancel = function(){
        vm.isAchCategoryCollapsed = true;
        vm.achCategory = {};
    };

    vm.removeAchCategoryFromCollection = function(obj){
        var tmp = false;
        modalConfirm(function(tmp){
            if(tmp){
                var index = vm.achCategories.indexOf(obj);
                vm.achCategories.splice(index, 1);
                var Categories = $resource(prefix + 'api/achievementcategories/:id', {id: '@id'}, {'delete': { method:'DELETE' }});
                var cat = Categories.delete({id: obj.id}, function(res){
                        console.log("Deleted successfully!")
                    }, function(err){
                        console.log(err);
                });
            }
        });
    };

    vm.createTechnologyInCollection = function(){  
        var tmp = vm.technology.category;
        vm.technology.category = vm.technology.category.id;
        var Technologies = $resource(prefix + 'api/technologies', null, {'post': { method:'POST' }});
        var tech = Technologies.post(vm.technology, function(newTech){
                newTech.category = tmp;
                vm.technologies.push(newTech);
            }, function(err){
                console.log(err);
            });
        vm.technology = {};
        vm.technology.category = vm.techCategories[0];
        vm.technologyAlert = true;
        vm.isTechnologyCollapsed = true;
        $timeout( function() {vm.technologyAlert = false}, 5000);
    };

    vm.selectCategory = function(technology, category){
    	technology.category = category;
    };

    vm.updateTechnologyInCollection = function(technology){
        var obj = {};
        obj.name = technology.name;
        obj.category = technology.category.id;
        var Technologies = $resource(prefix + 'api/technologies/:id', {id: '@id'}, {'update': { method:'PUT' }});
        var tech = Technologies.update({id: technology.id}, obj);
    };

    vm.technologyCancel = function(){
        vm.isTechnologyCollapsed = true;
        vm.technology = {};
        vm.technology.category = vm.techCategories[0];
    };

    vm.removeTechnologyFromCollection = function(obj){
        var tmp = false;
        modalConfirm(function(tmp){
            if(tmp){
                var index = vm.technologies.indexOf(obj);
                vm.technologies.splice(index, 1);
                var Technologies = $resource(prefix + 'api/technologies/:id', {id: '@id'}, {'delete': { method:'DELETE' }});
                var tech = Technologies.delete({id: obj.id}, function(res){
                        console.log("Deleted successfully!")
                    }, function(err){
                        console.log(err);
                });
            }
        });
    };

    function modalConfirm(callback){
        
        var modalInstance = $modal.open({
          templateUrl: 'modalConfirmDelete.html',
          controller: 'ModalConfirmController',
          controllerAs: 'modalconf'
        });

        modalInstance.result.then(callback);
        
    };
    
});
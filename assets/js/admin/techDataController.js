var app = require('../angular-app');

app.controller('TechDataController', function($resource){
	var vm = this;
    vm.positions = [];
    vm.contentEditable = false;
    getPositions();

    function getPositions(){
        var Positions = $resource('/api/positions');
        var pos = Positions.query(function(res){
                vm.positions = res;               
            }, function(err){
                console.log(err);
            });
    };

    function updatePositionInCollection(position){
        var Positions = $resource('/api/positions/:id', {id: '@id'}, {'update': { method:'PUT' }});
        var pos = Positions.update({id: position.id}, position);
    };
});
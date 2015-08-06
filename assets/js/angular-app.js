(function() {
    var app = angular.module('myApp', ['ui.bootstrap']);

    angular.module('myApp').controller('TabsCtrl', function ($scope, $window) {
  $scope.tabs = [
    { title:'My profile', content:'My profile' },
    { title:'myCV', content:'myCV' },
    { title:'PDP flow', content:'PDP flow' }
    
  ];});
})();



(function() {
    var app = angular.module('myApp', ['ui.bootstrap']);

    angular.module('myApp').controller('TabsCtrl', function ($scope, $window) {
  $scope.tabs = [
    { title:'My profile', content:'Dynamic content 1' },
    { title:'myCV', content:'Dynamic content 2' },
    { title:'PDP flow', content:'Dynamic content 3' }
    
  ];

  $scope.alertMe = function() {
    setTimeout(function() {
      $window.alert('You\'ve selected the alert tab!');
    });
  };
});
})();



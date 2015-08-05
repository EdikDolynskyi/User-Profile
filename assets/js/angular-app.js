(function() {
    var app = angular.module('myApp', []);

    app.controller('GreetingCtrl', function(){
        this.greeting = "Hello"
    });
    app.directive('mGreeting', function() {
        return {
            scope: {
                text: '='
            },
            templateUrl: 'js/user-profile/user-profile.html'
        }
    });
})();



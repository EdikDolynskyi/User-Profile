var app = require('../angular-app');

app.controller('MainController', ['$scope', 'MainService', '$rootScope', '$location', mainCtrl]);

function mainCtrl($scope, service, $rootScope, $location) {
    var ctrl = this;
    $rootScope.var = '55c38b5a956240ba4c6a5f24';
    ctrl.usersList = [];
    this.search = function () {
        var surname = ctrl.searchText;
        service.search(surname, function (users) {
            ctrl.usersList = users;
        });
    };
    this.showUserPage = function (index) {
        $rootScope.var = ctrl.usersList[index].id;
        $location.path('/#/');
    };
}

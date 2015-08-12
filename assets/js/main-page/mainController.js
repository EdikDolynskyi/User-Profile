var app = require('../angular-app');

app.controller('MainController', ['$scope', 'MainService', '$rootScope', mainCtrl]);

function mainCtrl($scope, service, $rootScope) {
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
        alert($rootScope.var);
    };
}

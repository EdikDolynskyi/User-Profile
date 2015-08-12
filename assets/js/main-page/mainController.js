var app = require('../angular-app');

app.controller('MainController', ['$scope', 'MainService', mainCtrl]);

function mainCtrl($scope, service, upload) {
    var ctrl = this;
    ctrl.usersList = [];
    this.search = function () {
        var surname = ctrl.searchText;
        service.search(surname, function (users) {
            ctrl.usersList = users;
        });
    };
}

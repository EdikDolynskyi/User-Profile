var app = require('../angular-app');

app.controller('MainController', ['$scope', 'MainService', '$rootScope', '$location', mainCtrl]);

function mainCtrl($scope, service, $rootScope, $location) {
    var ctrl = this;
    ctrl.searchParams = {};
    $rootScope.var = '55c38b5a956240ba4c6a5f24';


    this.search = function () {
        var surname = ctrl.searchText;
        service.search(surname, function (users) {
            ctrl.usersList = users;
        });
    };

    this.allUsers = function () {
        service.allUsers(function (allusers) {
            ctrl.allUsersList = allusers;
        });
    };

    this.allTechnologies = function () {
        service.allTechnologies(function (tech) {
            ctrl.allTechList = tech;
        });
    };

    this.allDirections = function () {
        service.allDirections(function (directions) {
            ctrl.allDirectionList = directions;
        });
    };

    this.allPositions = function () {
        service.allPositions(function (positions) {
            ctrl.allPositionsList = positions;
        });
    };

    this.allCertificates = function () {
        service.allCertificates(function (certificates) {
            ctrl.allCertificatesList = certificates;
        });
    };


    this.showUserPage = function (id) {
        $rootScope.var = id;
        $location.path('/#/');
        ctrl.usersList = [];
        ctrl.searchText = '';
    };

    this.showUserPageFromFilter = function (id) {
        $rootScope.var = id;
        $location.path('/#/');
    };

    this.go = function (path) {
        $location.path(path);
    };

    this.GlobalSearch = function () {
        service.searchByFilter(ctrl.searchParams, function (users) {
            ctrl.allUsersList = users;
        });
    };
}
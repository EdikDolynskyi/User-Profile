var app = require('../angular-app');

app.controller('MainController', ['$scope', 'MainService', '$rootScope', '$location', mainCtrl]);

function mainCtrl($scope, service, $rootScope, $location) {
    var ctrl = this;
    ctrl.search = {};
    $rootScope.var = '55c38b5a956240ba4c6a5f24';


    this.search = function () {
        var surname = ctrl.searchText;
        service.search(surname, function (users) {
            ctrl.usersList = users;
        });
    };

    this.searchByFilter = function () {

        service.searchByFilter(ctrl.search, function (users) {
            ctrl.allUsersList = users;
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


    this.showUserPage = function (index) {
        $rootScope.var = ctrl.usersList[index].id;
        $location.path('/#/');
        ctrl.usersList = [];
        ctrl.searchText = '';
    };

    this.showUserPageFromFilter = function (index) {
        $rootScope.var = ctrl.allUsersList[index].id;
        $location.path('/#/');
    };

    this.go = function (path) {
        $location.path(path);
    };

    //sory, it`s a big govnocod(
    this.GlobalSearch = function () {
        ctrl.allUsersList = [];
        if (!ctrl.search.hasOwnProperty("technology"))
            ctrl.search.technology = {name: ''};
        if (!ctrl.search.hasOwnProperty("knowlevel"))
            ctrl.search.knowlevel = '';
        if (!ctrl.search.hasOwnProperty("direction"))
            ctrl.search.direction = {name: ''};
        if (!ctrl.search.hasOwnProperty("position"))
            ctrl.search.position = {name: ''};
        if (!ctrl.search.hasOwnProperty("certificate"))
            ctrl.search.certificate = {name: ''};

        if (!ctrl.search.technology)
            ctrl.search.technology = {name: ''};
        if (!ctrl.search.knowlevel)
            ctrl.search.knowlevel = '';
        if (!ctrl.search.direction)
            ctrl.search.direction = {name: ''};
        if (!ctrl.search.position)
            ctrl.search.position = {name: ''};
        if (!ctrl.search.certificate)
            ctrl.search.certificate = {name: ''};

        ctrl.searchByFilter();
    };
};
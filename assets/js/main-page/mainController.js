var app = require('../angular-app');

app.controller('MainController', ['$scope', 'MainService', '$rootScope', '$location', '$cookies', mainCtrl]);

function mainCtrl($scope, service, $rootScope, $location, $cookies) {
    var ctrl = this;
    this.prefix = window.location.pathname;

    ctrl.usersList = [];
    ctrl.searchParams = {};

    $rootScope.userId = '';
    $rootScope.ownerId = '';
    $rootScope.serverUserId = $cookies.get('serverUID');
    var role = $cookies.get('userRole');


    //if(role == 'ADMIN'){
    //    $rootScope.isAdmin = true;
    //}
    //else {
    //    $rootScope.isAdmin = false;
    //}


    $rootScope.isAdmin = true;



    service.getByServerUserId($rootScope.serverUserId, function (user) {
        $rootScope.ownerId = $rootScope.userId = user.id;
    });


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
        $location.path('/userdata/' + id);
        ctrl.usersList = [];
        ctrl.searchText = '';
    };

    this.showUserPageFromFilter = function (id) {
        $location.path('/userdata/' + id);
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
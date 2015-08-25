var app = require('../angular-app');

app.controller('MainController', ['$scope', 'MainService', '$rootScope', '$location', mainCtrl]);

function mainCtrl($scope, service, $rootScope, $location) {
    var ctrl = this;

    ctrl.usersList = [];
    ctrl.searchParams = {};

    //ownerId - id who login //userId - id of view user //adminId - id of admin
    $rootScope.ownerId = '55c38b5a956240ba4c6a5f24';

    $rootScope.userId = '55c38b5a956240ba4c6a5f24';


    //set when admin login
    $rootScope.isAdmin = false;
    $rootScope.adminId = '55d6f0af768851c79c9dd781';

    if($rootScope.isAdmin)
        $rootScope.userId = $rootScope.adminId = '55c38b5a956240ba4c6a5f24';
    console.log($rootScope.ownerId);


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
        $rootScope.userId = id;
        $location.path('/userdata');
        ctrl.usersList = [];
        ctrl.searchText = '';
        //ng-init="TabsCtrl.deactivateUserProfileTab()";
    };

    this.showUserPageFromFilter = function (id) {
        $rootScope.userId = id;
        $location.path('/userdata');
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
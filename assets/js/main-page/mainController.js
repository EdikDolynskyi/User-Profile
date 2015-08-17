var app = require('../angular-app');

app.controller('MainController', ['$scope', 'MainService', '$rootScope', '$location', mainCtrl]);
     
function mainCtrl($scope, service, $rootScope, $location) {
    var ctrl = this;
    $rootScope.var = '55c38b5a956240ba4c6a5f24';
    
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

    this.search = function () {
        var surname = ctrl.searchText;
        service.search(surname, function (users) {
            ctrl.usersList = users;
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

    this.GlobalSearch = function (selected_technology, selected_direction, selected_position, selected_certificate) {
        ctrl.allUsersList = [];
        if(selected_technology||selected_direction||selected_position||selected_certificate) {
            if(selected_technology) {
                searchByTechnologyName(selected_technology);
            }
            if(selected_position) {
                searchByPosition(selected_position);
            }
            if(selected_direction) {
                searchByDirection(selected_direction);
            }
            if(selected_certificate) {
                searchByCertificate(selected_certificate);
            }
        } else alert("Please, chose some parameter for searching."); 
    };

    function searchByTechnologyName (selected_technology) {
       service.searchbytechnologyname(selected_technology.id, function (cvs) {
           searchByCV(cvs);
       });
    };

    function searchByDirection (selected_direction) {
       service.searchbydirection(selected_direction.id, function (pdps) {
           searchByPDP(pdps);
       });
    };

    function searchByPosition (selected_position) {
       service.searchbyposition(selected_position.id, function (pdps) {
           searchByPDP(pdps);
       });
    };
   
    function searchByCertificate (selected_certificate) {
       service.searchbycertificate(selected_certificate.id, function (pdps) {
           searchByPDP(pdps);
       });
    };

    function searchByPDP (pdpId) {
        var userARR=[];
        ctrl.allUsersList = [];
        service.searchbypdp(pdpId, function (user) {
            userARR.push(user[0]);
        });
        ctrl.allUsersList = userARR;
    };

    function searchByCV (cvId) {
        var userARR=[];
        ctrl.allUsersList = [];
        service.searchbycv(cvId, function (user) {
            userARR.push(user[0]);
        });
        ctrl.allUsersList = userARR;
    };
};
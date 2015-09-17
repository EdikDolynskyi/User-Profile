var app = require('../angular-app');
var mongoose = require('mongoose');

app.controller('createUserController', ['createUserService', '$cookies', userCtrl]);

function userCtrl(createUserService, $cookies) {
    var vm = this;
    var prefix = window.location.pathname;
    prefix = prefix.substr(0, 9);
    vm.newUserEmail = $cookies.get('newUserEmail');
    vm.newUserId = $cookies.get('newUserId');
    vm.user = {
        position: null,
        direction: null,
        allPositions: [],
        allDirections: []
    };

    vm.today = new Date();
    var defaultUser = {
        "email": vm.newUserEmail,
        "serverUserId": vm.newUserId,
        "password": "123456789",
        "name": "",
        "surname": "Surname",
        "country": "Country",
        "city": "City",
        "gender": "male",
        "birthday": vm.today,
        "avatar": {
            "urlAva": prefix + "api/files/get/Unknown.png",
            "thumbnailUrlAva": ""
        },
        "workDate": vm.today,
        "userCV": '',
        "userPDP": '',
        "isDeleted": false,
        "changeAccept": true,
        "preModeration": {}
    };

    var defaultCV = {
        "projects": [],
        "isDeleted": false,
        "technologies": []
    };

    var defaultPDP = {
        "position": "",
        "direction": "",
        "achievements": [],
        "certifications": [],
        "completedCertifications": [],
        "tasks": [],
        "tests": [],
        "technologies": [],
        "isDeleted": false
    };

    vm.user = angular.copy(defaultUser);
    vm.userPdp = angular.copy(defaultPDP);


    createUserService.getPositions(function (array) {
        vm.user.allPositions = array;
    });
    createUserService.getDirections(function (array) {
        vm.user.allDirections = array;
    });

    vm.createUser = function () {
        if (vm.user.name && vm.user.position && vm.user.direction) {
            vm.userPdp.position = mongoose.Types.ObjectId(vm.user.position);
            vm.userPdp.direction = mongoose.Types.ObjectId(vm.user.direction);
            createUserService.createUser(vm.user, defaultCV, vm.userPdp, function (user) {
                $cookies.remove('newUserId');
                $cookies.remove('newUserEmail');
                alert("User added");
            });
        }
        else {
            alert('Please, enter the name of user or select position')
        }
    };
    vm.cancel = function () {
    }
}

var app = require('../angular-app');

app.controller('createUserController', ['$scope', 'createUserService', '$cookies', userCtrl]);

function userCtrl($scope, createUserService, $cookies) {
    var vm = this;
    vm.newUserId = $cookies.get('newUserId');
    vm.newUserEmail = $cookies.get('newUserEmail');
    //vm.newUserId = '55de32626b8bc0b909ba261$';
    console.log("email " + vm.newUserEmail);
    console.log("user id " + vm.newUserId);

    vm.today = new Date();
    var defaultUser = {
        "email": vm.newUserEmail,
        "serverUserId": vm.newUserId,
        "password": "123456789",
        "name": "Name",
        "surname": "Surname",
        "country": "Country",
        "city": "City",
        "gender": "male",
        "birthday": vm.today,
        "avatar": {
            "urlAva": "/api/files/get/Unknown.png",
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

    vm.createUser = function () {
        createUserService.create(vm.user, defaultCV, defaultPDP, function (user) {
            console.log(user.id);
            $cookies.remove('newInfo');
            $cookies.remove('newUserId');
            $cookies.remove('newUserEmail');
            alert("User added");
        })
    };
    vm.cancel = function () {
    }

}

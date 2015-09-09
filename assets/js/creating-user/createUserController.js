var app = require('../angular-app');

app.controller('createUserController', ['$scope', 'createUserService', '$cookies', userCtrl]);

function userCtrl(createUserService, $cookies) {
    var vm = this;
    var prefix = window.location.pathname;
    vm.newUserId = $cookies.get('newUserId');
    vm.newUserEmail = $cookies.get('newUserEmail');

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

    vm.createUser = function () {
        if(vm.user.name) {
            createUserService.create(vm.user, defaultCV, defaultPDP, function (user) {
                console.log(user.id);
                $cookies.remove('newUserId');
                $cookies.remove('newUserEmail');
                alert("User added");
            })
        }
        else {
            alert('Please, enter the name of user')
        }
    };
    vm.cancel = function () {
    }

}

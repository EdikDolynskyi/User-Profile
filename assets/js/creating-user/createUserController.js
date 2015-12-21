var app = require('../angular-app');
var mongoose = require('mongoose');

app.controller('createUserController', ['createUserService', '$cookies', '$window', createUserCtrl]);

function createUserCtrl(createUserService, $cookies, $window) {
    var vm = this;
    //cut path for get correct path in server (profile/newuser/ -> 'profile/')
    vm.prefix = window.location.pathname;
    vm.prefix = vm.prefix.substr(0, 9);

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
    vm.userPdp = angular.copy(defaultPDP);


    createUserService.getPositions(function (array) {
        vm.user.allPositions = array;
    });
    createUserService.getDirections(function (array) {
        vm.user.allDirections = array;
    });

    vm.createUser = function (form) {
        if (vm.user.name && vm.user.position && vm.user.direction) {
            vm.userPdp.position = mongoose.Types.ObjectId(vm.user.position);
            vm.userPdp.direction = mongoose.Types.ObjectId(vm.user.direction);
            createUserService.createUser(vm.user, defaultCV, vm.userPdp, function (user) {
                $cookies.remove('newUserId');
                $cookies.remove('newUserEmail');
                alert("User added");
                $window.location.href = 'http://team.binary-studio.com/auth/#/users';
            });
        }
        else {
            var fields = ['userName', 'userPosition', 'userDirection'];
            vm.setStateOfFields(fields, form);
        }
    };
    
    vm.cancel = function () {
    }

    vm.setStateOfFields = function(fields, form){
        for(var i=0; i<fields.length; i++){
            form[fields[i]].$setDirty();
            form[fields[i]].$setTouched();
        }
    }
}

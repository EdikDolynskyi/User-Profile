var app = require('../angular-app');

app.controller('createUserController', ['$scope', 'createUserService', '$cookies', userCtrl]);

function userCtrl($scope, createUserService, $cookies) {
    var vm = this;
    //vm.newUserId = $cookies.get('newUserId');
    vm.newUserId = '55de32626b8bc0b909ba261$';

    createUserService.get(vm.newUserId, function(rez){
        console.log(rez);
        if(rez){
            alert("User with this serverId already stored in the database");
        }
        else {
            vm.today = new Date();
            var someEmail = "email@email.com";
            var defaultUser = {
                "email" : someEmail,
                "serverUserId" : vm.newUserId,
                "password" : "123456789",
                "name" : "Name",
                "surname" : "Surname",
                "country" : "Country",
                "city" : "City",
                "gender" : "male",
                "birthday" : vm.today,
                "avatar" : {
                    "urlAva" : "/api/files/get/Unknown.png",
                    "thumbnailUrlAva" : ""
                },
                "workDate" : vm.today,
                "userCV" : '',
                "userPDP" : '',
                "isDeleted" : false,
                "changeAccept" : true,
                "preModeration" : {}
            };

            var defaultCV = {
                "projects" : [],
                "isDeleted" : false,
                "technologies" : []
            };

            var defaultPDP = {
                "position" : "",
                "direction" : "",
                "achievements" : [],
                "certifications" : [],
                "completedCertifications" : [],
                "tasks" : [],
                "tests" : [],
                "technologies" : [],
                "isDeleted" : false
            };

            vm.user = angular.copy(defaultUser);

            vm.createUser = function(){
                createUserService.create(vm.user, defaultCV, defaultPDP, function(user){
                    console.log(user.id);
                    alert("User added");
                    $cookies.remove('newUserId');
                    $cookies.remove('x-access-token');
                })
            };
            vm.cancel = function(){
            }
        }
    });

}

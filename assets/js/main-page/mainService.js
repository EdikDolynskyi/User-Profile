var app = require('../angular-app');

app.service('MainService', MainService);
function MainService($resource) {

    this.search = function(username, cb) {
        // $resource('/api/users/?surname=', {surname: username}).query(function (users) {
        //     if(users.length>0){
        //         cb(users);
        //     }
        //     else{
        //             SearchByName(username, cb);
        //     }
        // });
        //function SearchByName (username, cb) {

            var selectedUsers = [];
            $resource('/api/users/').query(function (users) {
                var searchUserName = username.toUpperCase();               
                var patt = new RegExp(searchUserName);
                for (var i = users.length - 1; i >= 0; i--) {   
                    var userName = users[i].name.toUpperCase();
                    var userSurname = users[i].surname.toUpperCase(); 
                        if(patt.test(userName)) {
                            selectedUsers.push(users[i]);
                        } 
                        if(patt.test(userSurname)) {
                            selectedUsers.push(users[i]);
                        }                                     
                };
                cb(selectedUsers);
            });
    };

    this.get = function(id, cb) {
        $resource('/api/users/:id', {id: id}).get(function (user) {
            user.birthday = new Date(user.birthday);
            cb(user);
        });
    };
};
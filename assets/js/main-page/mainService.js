var app = require('../angular-app');

app.service('MainService', MainService);

function MainService($resource) {
    this.search = function(surname, cb) {
        $resource('/api/users/?surname=', {surname: surname}).query(function (users) {
            if(users.length>0){
                cb(users);
            }
            else{
                    SearchByName(surname, cb);
            }
        });
        function SearchByName (surname, cb) {
            $resource('/api/users/?name=', {name: surname}).query(function (users) {
                cb(users);
            });
        };
    };
    this.get = function(id, cb) {
        $resource('/api/users/:id', {id: id}).get(function (user) {
            user.birthday = new Date(user.birthday);
            cb(user);
        });
    };
}
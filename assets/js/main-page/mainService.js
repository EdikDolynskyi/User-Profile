var app = require('../angular-app');

app.service('MainService', MainService);

function MainService($resource) {
    this.search = function(surname, cb) {
        $resource('/api/users/?surname=', {surname: surname}).query(function (users) {
            cb(users);
        });
    };
}
var app = require('../angular-app');

app.service('MainService', MainService);
function MainService($resource) {

    this.search = function (username, cb) {
        var selectedUsers = [];
        $resource('/api/users/').query(function (users) {
            var searchUserName = username.toUpperCase();
            var patt = new RegExp(searchUserName);
            for (var i = users.length - 1; i >= 0; i--) {
                var userName = users[i].name.toUpperCase();
                var userSurname = users[i].surname.toUpperCase();
                if (patt.test(userName)) {
                    selectedUsers.push(users[i]);
                }
                if (patt.test(userSurname)) {
                    selectedUsers.push(users[i]);
                }
            }
            ;
            cb(selectedUsers);
        });
    };


    this.searchByFilter = function (params, cb) {
        $resource('/user/filter').query({
            technology: params.technology.name,
            knowLevel: "none",
            direction: params.direction.name,
            position: params.position.name,
            certificate: params.certificate.name
        }, function (users) {
            cb(users);
        });
    };


    this.get = function (id, cb) {
        $resource('/api/users/:id', {id: id}).get(function (user) {
            user.birthday = new Date(user.birthday);
            cb(user);
        });
    };


    this.allUsers = function (cb) {
        $resource('/api/users/', {}).query(function (users) {
            cb(users);
        });
    };

    this.allTechnologies = function (cb) {
        $resource('/api/technologies/', {}).query(function (tech) {
            cb(tech);
        });
    };

    this.allDirections = function (cb) {
        $resource('/api/directions/', {}).query(function (directions) {
            cb(directions);
        });
    };

    this.allPositions = function (cb) {
        $resource('/api/positions/', {}).query(function (positions) {
            cb(positions);
        });
    };

    this.allCertificates = function (cb) {
        $resource('/api/certifications/', {}).query(function (certificates) {
            cb(certificates);
        });
    };
};
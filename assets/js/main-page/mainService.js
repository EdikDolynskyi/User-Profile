var app = require('../angular-app');

app.service('MainService', MainService);
function MainService($resource) {
    var prefix = window.location.pathname;

    this.search = function(username, cb) {
        var selectedUsers = [];
        $resource(prefix + 'user/filter').query(function (users) {
            var searchUserName = username.toUpperCase();
            var patt = new RegExp(searchUserName);
            for (var i = users.length - 1; i >= 0; i--) {
                var userName = users[i].name.toUpperCase();
                if(patt.test(userName)&&searchUserName.length>=2) {
                    selectedUsers.push(users[i]);
                }
            };
            cb(selectedUsers);
        });
    };

    this.searchByFilter = function (params, cb) {
        $resource(prefix + 'user/filter').query(params, function (users) {
            cb(users);
        });
    };

    this.get = function (id, cb) {
        $resource(prefix + 'api/users/:id', {id: id}).get(function (user) {
            user.birthday = new Date(user.birthday);
            cb(user);
        });
    };

    this.getByServerUserId = function(suid, cb) {
        $resource(prefix + 'api/users/?serverUserId=:id', {id: suid}).query(function (users) {
            cb(users.length ? users[0] : null);
        })
    };

    this.allUsers = function (cb) {
        $resource(prefix + 'api/users/filter', {}).query(function (users) {
            cb(users);
        });
    };

    this.allTechnologies = function (cb) {
        $resource(prefix + 'api/technologies/', {}).query(function (tech) {
            cb(tech);
        });
    };

    this.allDirections = function (cb) {
        $resource(prefix + 'api/directions/', {}).query(function (directions) {
            cb(directions);
        });
    };

    this.allPositions = function (cb) {
        $resource(prefix + 'api/positions/', {}).query(function (positions) {
            cb(positions);
        });
    };

    this.allCertificates = function (cb) {
        $resource(prefix + 'api/certifications/', {}).query(function (certificates) {
            cb(certificates);
        });
    };
};
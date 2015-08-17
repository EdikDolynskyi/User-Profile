var app = require('../angular-app');

app.service('MainService', MainService);
function MainService($resource) {

    this.search = function(username, cb) {
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


    this.searchbytechnologyname = function(idtech, cb) {
        $resource('/api/cvs/?technologies.userTech=', {"technologies.userTech": idtech}).query(function (cvs) {
            cb(cvs);
        });
    };

    this.searchbydirection = function(iddirection, cb) {
        $resource('/api/pdps/?direction=', {direction: iddirection}).query(function (pdps) {
            cb(pdps);
        });
    };

    this.searchbyposition = function(idposition, cb) {
        $resource('/api/pdps/?position=', {position: idposition}).query(function (pdps) {
            cb(pdps);
        });
    };

    this.searchbycertificate = function(idcertificate, cb) {
        $resource('/api/pdps/?certificates.name=', {"certificates.name": idcertificate}).query(function (pdps) {
            cb(pdps);
        });
    };


    this.searchbypdp = function(idpdp, cb) {
         var userArray = [];
        for(var i=0; i<idpdp.length; i++) {
            $resource('/api/users/?userPDP=', {userPDP: idpdp[i].id.toString()}).query(function (users) {
            cb(users);
         });
        }; 
    };

    this.searchbycv = function(idcv, cb) {
         var userArray = [];
        for(var i=0; i<idcv.length; i++) {
            $resource('/api/users/?userCV=', {userCV: idcv[i].id.toString()}).query(function (users) {
            cb(users);
         });
        }; 
    };


    this.allUsers = function(cb) {
        $resource('/api/users/', {}).query(function (users) {
            cb(users);
        });
    };

    this.allTechnologies = function(cb) {
        $resource('/api/technologies/', {}).query(function (tech) {
            cb(tech);
        });
    };

    this.allDirections = function(cb) {
        $resource('/api/directions/', {}).query(function (directions) {
            cb(directions);
        });
    };

    this.allPositions = function(cb) {
        $resource('/api/positions/', {}).query(function (positions) {
            cb(positions);
        });
    };

    this.allCertificates = function(cb) {
        $resource('/api/certifications/', {}).query(function (certificates) {
            cb(certificates);
        });
    };

    this.get = function(id, cb) {
        $resource('/api/users/:id', {id: id}).get(function (user) {
            user.birthday = new Date(user.birthday);
            cb(user);
        });
    };
};
var app = require('../angular-app');

app.controller('UserProfilePublicController', ['UserProfileService', '$rootScope', '$route', userCtrl]);

function userCtrl(service, $rootScope, $route) {
    var ctrl = this;
    var prefix = window.location.pathname;
    //Init
    ctrl.today = new Date();

    ctrl.calculateAge = function(birthday) { // pass in player.dateOfBirth
        var ageDifMs = Date.now() - new Date(birthday);
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    var serverId = $route.current.params.serverId;
    if (serverId) {
        service.getByServerUserId(serverId, function (user) {
            $rootScope.userId = user.id;
            ctrl.user = user;
            ctrl.user.age = ctrl.calculateAge(ctrl.user.birthday);
        });
    } else {
        var userId = $route.current.params.userId;
        $rootScope.userId = userId;
        service.get(userId, function (user) {
            ctrl.user = user;
            ctrl.user.age = ctrl.calculateAge(ctrl.user.birthday);
        });
    }
}

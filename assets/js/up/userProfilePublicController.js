var app = require('../angular-app');

app.controller('UserProfilePublicController', ['UserProfilePublicService', '$rootScope', '$route', userCtrl]);

function userCtrl(service, $rootScope, $route) {
    var ctrl = this;
    //Init
    ctrl.today = new Date();

    var serverId = $route.current.params.serverId;
    if (serverId) {
        service.getByServerUserId(serverId, function (user) {
            $rootScope.userId = user.id;
            ctrl.user = user;
            ctrl.userOriginal = angular.extend({}, user);
        });
    } else {
        var userId = $route.current.params.userId;
        $rootScope.userId = userId;
        service.get(userId, function (user) {
            ctrl.user = user;
            ctrl.userOriginal = angular.extend({}, user);
        });
    }
}

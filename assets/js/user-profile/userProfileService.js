var app = require('../angular-app');

app.service('UserProfileService', UserProfileService);

function UserProfileService($resource) {
    this.getUserData = function() {
        return $resource('http://localhost:1337/api/users/55c38b5a956240ba4c6a5f24');
    };
}

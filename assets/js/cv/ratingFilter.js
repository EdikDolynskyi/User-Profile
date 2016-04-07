var app = require('../angular-app');

app.filter('rating', function() {
    return function(items, rating) {
        var filtered = [];

        angular.forEach(items, function(item) {
            if ((item.stars >= rating) || (rating == 0)) {
                filtered.push(item);
            }
        });

        return filtered;
    };
});
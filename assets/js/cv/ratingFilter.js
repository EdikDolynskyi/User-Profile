var app = require('../angular-app');

app.filter('ratingFilter', function() {
    return function(array, rating) {
        var output = [];

        angular.forEach(array, function(item) {
            if ((item.stars >= rating) || (rating == 0)) {
                output.push(item);
            }
        });

        return output;
    };
});
var app = require('../angular-app');

app.filter('unique', function() {
    return function(items) {
        var filtered = [];
        var isFound = false;

        angular.forEach(items, function(item) {
            isFound = false;

            angular.forEach(filtered, function(filteredItem) {
                if (item.category.id == filteredItem.category.id) {
                    isFound = true;
                }
            });

            if (!isFound) {
                filtered.push(item);
            }
        });

        return filtered;
    };
});


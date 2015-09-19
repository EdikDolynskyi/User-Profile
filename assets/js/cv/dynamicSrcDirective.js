var app = require('../angular-app');

app.directive('dynamicSrc', function() {
    return {
        restrict: 'A',
        scope: true,
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                if(scope.image.index == scope.images.length - 1) {
                    scope.image.index = 0;
                } else {
                    scope.image.index++;
                }

                var src = scope.images[scope.image.index].img;
                attrs.$set('ngSrc', src);
            })
        }
    }
});
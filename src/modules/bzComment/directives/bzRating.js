define('modules/bzComment/directives/bzRating', [
    'modules/bzComment/app'
], function (app) {

    app.directive('bzRating', function() {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                'count': '=bzRating'
            },
            templateUrl: '/src/modules/bzComment/views/bzRating.html',
            link: function(scope, element, attrs) {
                scope.count = scope.count || 0;
            }
        };
    });

});
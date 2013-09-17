define('frontend/directives/bzScript', [
    'frontend/app'
], function(app) {
    'use strict';

    app.directive('bzScript', ['$parse', function($parse) {
        return {
            restrict: 'A',
            scope: {
                'script' : '=bzScript'
            },
            link: function(scope, element, attrs) {
                eval(scope.script);
            }
        };
    }]);
});
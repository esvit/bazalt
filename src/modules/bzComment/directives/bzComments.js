define('modules/bzComment/directives/bzComments', [
    'modules/bzComment/app'
], function (app) {
    'use strict';

    app.directive('bzComments', function () {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                'comments': '=bzComments'
            },
            templateUrl: '/src/modules/bzComment/views/bzComments.html',
            link: function (scope) {
                scope.comments = scope.comments || [];
            }
        };
    });

});
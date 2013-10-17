define('modules/bzSticky/directives/bzSticky', [
    'modules/bzSticky/app'
], function (app) {
    'use strict';

    app.directive('bzSticky', function () {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope, element, attrs) {
                element.sticky({
                    topSpacing: 0,
                    className: 'sticky',
                    wrapperClassName: 'sticky-wrapper'
                });
            }
        };
    });

});

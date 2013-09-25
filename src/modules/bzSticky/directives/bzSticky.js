define('modules/bzSticky/directives/bzSticky', [
    'modules/bzSticky/app'
], function (app) {
    'use strict';

    app.directive('bzSticky', function () {
        return {
            restrict: 'A',
            scope: false,
            require: 'bzSticky',
            link: function (scope, element, attrs) {
                scope.$watch('.header', function(value) {
                    console.info('123');
                    $('.container').sticky(
                        {
                            topSpacing: 0,
                            className: 'sticky',
                            wrapperClassName: 'sticky-wrapper'
                        }
                    );
                });
            }
        };
    });

});

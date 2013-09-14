define('modules/bzMenu/directives/bootstrapToggle', [
    'modules/bzMenu/app',

    'bootstrap/dropdown'
], function(app) {
    'use strict';

    app.directive('bootstrapToggle', function() {
        return {
            restrict: 'C',
            link: function($scope, $element) {
                $element.dropdown();
            }
        };
    });
});
define('modules/bzDatepicker/directives/bzDatepicker', [
    'modules/bzDatepicker/app'
], function (app) {
    'use strict';
    app.directive('bzDatepicker', function () {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope, element, attrs) {
                $(element).parent().click(function(e) {
                    e.preventDefault();
                }).datepicker();
            }
        };
    });

});
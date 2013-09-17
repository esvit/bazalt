define('modules/bzDatepicker/directives/bzDatepicker', [
    'modules/bzDatepicker/app'
], function (app) {
    'use strict';
    app.directive('bzDatepicker', function () {
        return {
            restrict: 'A',
            template: '<div></div>' ,
            replace: true,
            scope: {
                'div': '=bzDatepicker'
            },
            link: function (scope, element, attrs) {
                $('.data-picker', element).click(function(e) {
                    e.preventDefault();
                }).datepicker();
            }
        };
    });

});
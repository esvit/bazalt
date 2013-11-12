define([
    'bz.pages/app',

    'bz.pages/factories/page'
], function(app) {
    'use strict';

    app.directive('bzPagesPage', ['bz.pages.factories.page', '$parse', '$log', function(PageFactory, $parse, $log) {
        return {
            restrict: 'AE',
            scope: true,
            link: function(scope, element, attrs) {
                var settings = $parse(attrs.bzPagesPage)(scope);

                scope.loading = true;
                PageFactory.get(settings, function (page) {
                    scope.loading = false;
                    scope.page = page;
                }, function () {
                    scope.loading = false;
                });
            }
        };
    }]);
});
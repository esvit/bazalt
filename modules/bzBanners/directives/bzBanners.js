define('modules/bzBanners/directives/bzBanners', [
    'modules/bzBanners/app'
], function (app) {
    'use strict';

    app.directive('bzBanners', ['$timeout', '$parse', function ($timeout, $parse) {
        return {
            restrict: 'A',
            replace: false,
            scope: true,
            link: function(scope, element, attrs) {
                attrs.$observe('bzBanners', function(index) {
                    scope.index = $parse(index)(scope);
                });
                scope.$watch(attrs.total, function(value) {
                    scope.total = value;
                });
                scope.next = function() {
                    scope.index = scope.index || 0;
                    scope.total = scope.total || 0;
                    if (scope.total > 0) {
                        scope.index = (scope.index == scope.total - 1) ? 0 : scope.index + 1;
                    }
                    $timeout(function() { scope.next() }, 5000);
                }
                scope.next();

                scope.setIndex = function(index) {
                    scope.index = index;
                }
            }
        };
    }]);

});


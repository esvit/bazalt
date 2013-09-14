define('modules/bzConfirm/directives/bzConfirm', [
    'angular',
    'modules/bzConfirm/app'
], function (angular, app) {
    'use strict';

    app.directive('bzConfirm', ['$parse', function($parse) {
        return {
            restrict: 'A',
            scope: true,
            link: function(scope, element, attrs) {
                var callback = $parse(attrs.bzConfirm),
                    title = $parse(attrs.title)(scope),
                    message = $parse(attrs.message)(scope);
                element.click(function() {
                    if (confirm(message)) {
                        callback(scope, {});

                        if (!scope.$$phase) {
                            scope.$apply();
                        }
                    }
                })
            }
        };
    }]);

});
define('modules/bzLanguage/directives/localeBundle', [
    'modules/bzLanguage/app'
], function(app) {
    'use strict';

    app.directive('localeBundle', ['$translateBundle', '$rootScope', function (localeBundleFactory, $rootScope) {
        return {
            link: function (scope, element, attrs) {
                var bundle = attrs.localeBundle;
                if (!bundle) {
                    return;
                }
                localeBundleFactory(bundle, 'ru_RU').then(function(result) {
                    $rootScope.$localeBundle = result.data;
                });
                /*scope.$watch(bundleDetails.prefix + '.locale', function (locale) {
                    if (!locale || locale.trim().length === 0) {
                        localeBundleFactory(bundleDetails.bundle).addToScope(scope, bundleDetails.prefix);
                    } else {
                        localeBundleFactory(bundleDetails.bundle, locale).addToScope(scope, bundleDetails.prefix);
                    }
                });*/
            }

        };
    }]);

});
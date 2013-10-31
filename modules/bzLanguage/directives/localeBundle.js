define('modules/bzLanguage/directives/localeBundle', [
    'modules/bzLanguage/app'
], function(app) {
    'use strict';

    app.directive('localeBundle', ['$translateBundle', '$rootScope', 'bzLanguage', function (localeBundleFactory, $rootScope, bzLanguage) {
        return {
            link: function (scope, element, attrs) {
                var bundle = attrs.localeBundle;
                if (!bundle) {
                    return;
                }
                localeBundleFactory(bundle, bzLanguage.language()).then(function(result) {
                    $rootScope.$localeBundle = result.data;
                });
                scope.$watch('$language.language()', function (locale) {
                    if (angular.isUndefined(locale)) {
                        return;
                    }
                    if (!locale || locale.trim().length === 0) {
                        localeBundleFactory('theme').then(function(result) {
                            $rootScope.$localeBundle = result.data;
                        });//.addToScope(scope, 'theme');
                    } else {
                        localeBundleFactory('theme', locale).then(function(result) {
                            $rootScope.$localeBundle = result.data;
                        });//.addToScope(scope, 'theme');
                    }
                });
            }

        };
    }]);

});
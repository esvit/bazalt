define('modules/bzLanguage/module', [
    'angular',

    'modules/bzLanguage/app',

    'modules/bzLanguage/providers/$translate',
    'modules/bzLanguage/providers/$translateBundle',

    'modules/bzLanguage/directives/localeBundle',

    'modules/bzLanguage/filters/language'
], function(angular, app) {
    'use strict';

    app.provider('bzLanguage', [function() {
        this.$language = 'en_GB';

        this.language = function (alias) {
            this.$language = alias;
            return this;
        };

        this.$get = function() {
            var self = this;
            return {
                language: function (alias) {
                    if (angular.isDefined(alias)) {
                        self.$language = alias;
                    }
                    return self.$language;
                },
                id: function (alias) {
                    if (angular.isDefined(alias)) {
                        self.$language = alias;
                    }
                    return self.$language.substring(0,2);
                }
            };
        };
    }]);

    app.run(['$rootScope', 'bzLanguage', function($rootScope, bzLanguage) {
        $rootScope.$language = bzLanguage;
    }]);
    app.config(['$translateBundleProvider', function ($translateBundleProvider) {
        // URL pattern to fetch locale bundles.  Placeholders: {{bundle}}
        $translateBundleProvider.bundleUrl('/locale/{{bundle}}.json');

        // URL pattern to fetch locale bundles.  Placeholders: {{bundle}} and {{locale}}
        $translateBundleProvider.bundleLocaleUrl('/locale/{{bundle}}-{{locale}}.json');
    }]);

    app.filter('translate', ['$rootScope', function($rootScope) {
        return function(string) {
            if ($rootScope.$localeBundle) {
                return $rootScope.$localeBundle[string] || string;
            }
            return string;
        };
    }]);

});
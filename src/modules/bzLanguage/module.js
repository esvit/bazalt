define('modules/bzLanguage/module', [
    'modules/bzLanguage/app',

    'modules/bzLanguage/providers/$translate',
    'modules/bzLanguage/providers/$translateBundle',

    'modules/bzLanguage/directives/localeBundle',

    'modules/bzLanguage/filters/language'
], function(app) {
    'use strict';

    app.provider('bzLanguage', [function() {
        this.$language = 'en';

        this.language = function (alias) {
            this.$language = alias;
            return this;
        };

        this.$get = function() {
            var self = this;
            return {
                language: function () {
                    return self.$language;
                }
            };
        };
    }]);

    app.config(['$translateBundleProvider', function ($translateBundleProvider) {
        // URL pattern to fetch locale bundles.  Placeholders: {{bundle}}
        $translateBundleProvider.bundleUrl('/src/{{bundle}}/locale/{{bundle}}.json');

        // URL pattern to fetch locale bundles.  Placeholders: {{bundle}} and {{locale}}
        $translateBundleProvider.bundleLocaleUrl('/src/{{bundle}}/locale/{{locale}}.json');
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
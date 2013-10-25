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
        this.$language = 'en';

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
                }
            };
        };
    }]);

    app.config(['$translateBundleProvider', function ($translateBundleProvider) {
        // URL pattern to fetch locale bundles.  Placeholders: {{bundle}}
        $translateBundleProvider.bundleUrl('/{{bundle}}/locale/{{bundle}}.json');

        // URL pattern to fetch locale bundles.  Placeholders: {{bundle}} and {{locale}}
        $translateBundleProvider.bundleLocaleUrl('/{{bundle}}/locale/{{locale}}.json');
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
define('modules/bzLanguage/providers/$translateBundle', [
    'modules/bzLanguage/app'
], function(app) {
    'use strict';

    app.provider('$translateBundle', [function () {
        var _bundleUrl,
            _bundleLocaleUrl;

        this.bundleUrl = function (url) {
            _bundleUrl = url;
        };

        this.bundleLocaleUrl = function (url) {
            _bundleLocaleUrl = url;
        };

        function _createUrl(bundle, locale) {
            if (locale) {
                return _bundleLocaleUrl.replace('{{bundle}}', bundle || '').replace('{{locale}}', locale || '');
            }
            return _bundleUrl.replace('{{bundle}}', bundle || '');
        }

        this.$get = ['$http', function ($http) {
            return function (bundle, locale) {
                var url = _createUrl(bundle, locale);
                return $http.get(url, { cache: true });
            };
        }];
    }]);

});
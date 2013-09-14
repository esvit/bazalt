define('modules/bzLanguage/providers/$translate', [
    'modules/bzLanguage/app'
], function(app) {
    'use strict';

    app.provider('$translate', [function () {
        this.$get = ['$rootScope', function ($rootScope) {
            return function (string) {
                if ($rootScope.$localeBundle) {
                    return $rootScope.$localeBundle[string] || string;
                }
                return string;
            };
        }];
    }]);

});
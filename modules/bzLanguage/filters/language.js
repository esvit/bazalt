define('modules/bzLanguage/filters/language', [
    'modules/bzLanguage/app'
], function(app) {
    'use strict';

    app.filter('language', ['bzLanguage', function(bzLanguage) {
        return function(value, language) {
            if (typeof value == 'undefined' || value === null) {
                return value;
            }
            language = language || bzLanguage.language().substring(0,2);
            if (!value[language] && value.orig) {
                return value[value.orig];
            }
            return value[language] || '';
        }
    }]);

});
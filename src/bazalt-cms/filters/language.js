define('bazalt-cms/filters/language', [
    'bazalt-cms/app',

    'bazalt-cms/providers/bzLanguage'
], function(app) {
    'use strict';

    app.filter('language', ['bzLanguage', function(bzLanguage) {
        return function(value, language) {
            if (typeof value == 'undefined' || value === null) {
                return value;
            }
            language = language || bzLanguage.id();
            if (!value[language] && value.orig) {
                return value[value.orig] + ' (' + value.orig + ')';
            }
            return value[language] || value;
        }
    }]);

});
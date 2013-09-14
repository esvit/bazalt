define('backend/filters/slug', [
    'backend/app',

    'speakingurl'
], function(app, getSlug) {
    'use strict';

    app.filter('slug', function() {
        return function(value) {
            return getSlug(value);
        };
    });
});
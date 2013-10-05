/* jshint browser:true, jquery:true */
define('backend/main', [
    'backend/app', 'angular', 'backend/app', 'backend/files', 'backend/routes'
], function($, angular, app) {
    'use strict';

    clearTimeout(window.startup);

    angular.bootstrap(document.documentElement, [app.name]);
});
window.startup = setTimeout(function() {
    'use strict';

    if (typeof angular != 'undefined') {
        angular.bootstrap(document.documentElement, ['app']);
    }
    if (typeof window.callPhantom === 'function') {
        window.callPhantom({ status: 'done' });
    }
}, 2000);

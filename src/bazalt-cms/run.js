define([
    'bazalt-cms/app',

    'bazalt-cms/factories/pages/page',
    'bazalt-cms/factories/users/session',

    'bazalt-cms/controllers/pages/page',

    'bazalt-cms/providers/language',
    'bazalt-cms/providers/config',

    'bazalt-cms/directives/a',

    'bazalt-cms/filters/language',

    'bazalt-cms/helpers/indexOf'
], function(app) {

    app.config(['$httpProvider', function($httpProvider) {
        // send cookies via CORS
        $httpProvider.defaults.withCredentials = true;
    }]);

    app.run(['$rootScope', 'bazalt.language', 'bazalt.config', '$location',
        function($rootScope, language, config, $location) {
        $rootScope.$language = language;
        $rootScope.$config = config;

        // track for change language url like: /en, /ru
        $rootScope.$on('$locationChangeStart', function(e, newUrl) {
            //console.info($location.path());
            //if (newUrl.strPos)
            //    $location.path('/')
        })
    }]);

    return app;
});
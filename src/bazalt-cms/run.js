define([
    'bazalt-cms/app',

    'bazalt-cms/interceptors/status403',

    'bazalt-cms/factories/pages/page',
    'bazalt-cms/factories/users/session',

    'bazalt-cms/controllers/pages/page',

    'bazalt-cms/providers/bzLanguage',
    'bazalt-cms/providers/bzConfig',
    'bazalt-cms/providers/bzUser',

    'bazalt-cms/directives/a',

    'bazalt-cms/filters/language',

    'bazalt-cms/helpers/indexOf',
    'bazalt-cms/helpers/filter',
    'bazalt-cms/helpers/diff'
], function(app, status403interceptor) {

    app.config(['$httpProvider', function($httpProvider) {
        // send cookies via CORS
        $httpProvider.defaults.withCredentials = true;

        $httpProvider.responseInterceptors.push(status403interceptor);
    }]);

    app.run(['$rootScope', 'bzLanguage', 'bzConfig', '$location', '$log', '$route', 'bzUser',
        function($rootScope, $language, $config, $location, $log, $route, $user) {
        $rootScope.$language = $language;
        $rootScope.$config = $config;
        $rootScope.$user = $user;

        // track for change language url like: /en, /ru
        $rootScope.$on('$locationChangeStart', function(e, url) {
            for (var langs = $config.languages(), count = langs.length, i = 0; i < count; i++) {
                var pos, language = langs[i];
                if ((pos = url.indexOf('/' + language + '/')) > 0) {
                    url = url.substring(pos + 3);
                    if ($language.id() != language) {
                        $log.debug('Set language: ', language);
                        $language.id(language);
                    }
                    $log.debug('Redirect to: ', url);
                    e.preventDefault();
                    $location.url(url, true);
                    $route.reload();
                    break;
                }
            }
        });

        // reload route for check permissions for new user
        $user.$change(function() {
            $route.reload();
        });
    }]);

    return app;
});
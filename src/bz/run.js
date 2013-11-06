define([
    'bz/app',

    'bz/interceptors/status403',

    'bz/providers/bzLanguage',
    'bz/providers/bzConfig',
    'bz/providers/bzUser',

    'bz/directives/a',

    'bz/filters/language'
], function(app, status403interceptor) {

    app.config(['$httpProvider', function($httpProvider) {
        // send cookies via CORS
        $httpProvider.defaults.withCredentials = true;

        $httpProvider.responseInterceptors.push(status403interceptor);
    }]);

    app.run(['$rootScope', 'bzLanguage', 'bzConfig', '$location', '$log', '$route', 'bzUser',
        function($rootScope, $language, $config, $location, $log, $route, $user) {
        $log.debug('Thanks for using Bazalt CMS (http://bazalt-cms.com) by Vitalii Savchuk (esvit666@gmail.com)');

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
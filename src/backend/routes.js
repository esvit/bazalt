define('backend/routes', [
    'backend/app'
], function (app) {
    'use strict';

    app.config(['$routeSegmentProvider', '$locationProvider', '$sceProvider',
        function ($routeSegmentProvider, $locationProvider, $sceProvider) {
            $locationProvider
                .html5Mode(false)
                .hashPrefix('!');

            $routeSegmentProvider.options.autoLoadTemplates = true;

            $routeSegmentProvider
                .when('/', 'main');

            $routeSegmentProvider
                .segment('main', {
                    templateUrl: '/src/backend/views/dashboard.html'
                });

            $sceProvider.enabled(false);
        }]);

    app.run(['$rootScope', function ($rootScope) {
        $rootScope.languages = {
            current: 'en'
        };
    }]);

});
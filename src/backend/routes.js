define('backend/routes', [
    'angular',
    'backend/app'
], function (angular, app) {
    'use strict';

    app.config(['$routeSegmentProvider', '$locationProvider', '$sceProvider', 'bzConfigProvider',
        function ($routeSegmentProvider, $locationProvider, $sceProvider, bzConfig) {
            $locationProvider
                .html5Mode(false)
                .hashPrefix('!');

            bzConfig.templatePrefix('/bazalt');

            $routeSegmentProvider.options.autoLoadTemplates = true;

            $routeSegmentProvider
                .when('/', 'main')
                .when('/login', 'login');

            $routeSegmentProvider
                .segment('main', {
                    templateUrl: '/views/dashboard.html'
                })
                .segment('login', {
                    templateUrl: '/views/login.html',
                    controller: 'Backend.Controllers.Login'
                });

            $sceProvider.enabled(false);
        }]);

    app.run(['$rootScope', '$location', '$user', function ($rootScope, $location, $user) {
        $rootScope.languages = {
            current: 'en'
        };
        $rootScope.$on('$routeChangeStart', function (e, next, current) {
            // check user login for route
            if ((!$user || $user.is_guest) && next.segment !== 'login') {
                $location.path('/login');
            }
        });
    }]);

});
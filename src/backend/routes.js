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

            bzConfig.templatePrefix('/bazalt').mine('');

            $routeSegmentProvider.options.autoLoadTemplates = true;

            $routeSegmentProvider
                .when('/', 'main');

            $routeSegmentProvider
                .segment('main', {
                    templateUrl: '/src/backend/views/dashboard.html'
                });

            $sceProvider.enabled(false);
        }]);

    app.run(['$rootScope', 'baAcl', '$location', function ($rootScope, baAcl, $location) {
        $rootScope.languages = {
            current: 'en'
        };
        $rootScope.$on('routeSegmentChange', function(e, next, current) {
            // check permission for route
            if (angular.isDefined(next.segment.params.access) && !baAcl.hasPermission(next.segment.params.access)) {
                $location.path('/login');
            }
        });
    }]);

});
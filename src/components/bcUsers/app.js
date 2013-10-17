define('components/bcUsers/app', [
    'angular', 'angular-resource', 'angular-cookies', 'angular-route-segment', 'ngTable',

    'modules/bzWidgets/module'
], function (angular) {
    'use strict';

    var app = angular.module('Components.bcUsers', ['ngResource', 'ngRoute', 'ngCookies', 'ngTable', 'bzWidgets']);

    app.run(['$rootScope', '$location', function ($rootScope, $location) {
        $rootScope.$on('routeSegmentChange', function (e, next, current) {
            // @todo check permission for route
            /*if (angular.isDefined(next.segment.params.access) && !baAcl.hasPermission(next.segment.params.access)) {
             $location.path('/login');
             }*/
        });
    }]);
    return app;
});
define('components/bcUsers/app', [
    'angular', 'angular-resource', 'angular-cookies', 'angular-route-segment', 'ngTable', 'bootstrap/modal', 'bootstrap/tab',

    'modules/bzWidgets/module'
], function (angular) {
    'use strict';

    var app = angular.module('Components.bcUsers', ['ngResource', 'ngRoute', 'ngCookies', 'ngTable', 'bzWidgets']);

    app.run(['$rootScope', '$location', '$user', function ($rootScope, $location, $user) {
        $rootScope.$user = $user;
        $rootScope.$on('routeSegmentChange', function (e, next, current) {
            // @todo check permission for route
            /*if (angular.isDefined(next.segment.params.access) && !baAcl.hasPermission(next.segment.params.access)) {
             $location.path('/login');
             }*/
        });
    }]);
    return app;
});
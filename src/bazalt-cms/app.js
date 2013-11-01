define([
    'angular',

    'angular-resource', 'angular-route', 'angular-cookies',

    'angular-route-segment'
], function(angular) {
    'use strict';

    return angular.module('bazalt-cms', [
        'ngResource', 'ngRoute', 'ngCookies', 'ngLocale',

        'route-segment', 'view-segment'
    ]);
});
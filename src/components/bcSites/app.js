define('components/bcSites/app', [
    'angular', 'angular-resource', 'angular-route', 'ngTable',
], function(angular) {
    'use strict';

    var app = angular.module('Components.bcSites', ['ngResource', 'ngRoute', 'ngTable']);

    return app;
});


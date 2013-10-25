define('components/bcSites/app', [
    'angular', 'angular-resource', 'angular-route', 'ngTable',
], function(angular) {
    'use strict';

    var app = angular.module('Components.bcSites', ['ngResource', 'ngRoute', 'ngTable']);

    app.run(['$rootScope', 'bcSites.Factories.Site', function($rootScope, SiteResource) {

        $rootScope.$site = SiteResource.get({'id': 'current'}, function(site) {
        });
    }]);
    return app;
});


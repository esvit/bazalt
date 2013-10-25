define('components/bcSites/module', [
    'components/bcSites/app',

    'components/bcSites/factories/Site'
], function (app) {
    'use strict';

    app.run(['$rootScope', 'bcSites.Factories.Site', function($rootScope, SiteResource) {

        $rootScope.$site = SiteResource.get({'id': 'current'}, function(site) {
             //site;
        });
    }]);
});
define('components/bcSites/backend/module', [
    'components/bcSites/backend/app',

    'components/bcSites/factories/Site',

    'components/bcSites/backend/controllers/Main',
    'components/bcSites/backend/controllers/SiteEdit'
], function(app) {
    'use strict';

    app.config(['$routeSegmentProvider', 'bzConfigProvider',
        function ($routeSegmentProvider, bzConfig) {

        $routeSegmentProvider
            .when('/sites', 'sites')
            .when('/sites/new', 'sitesNew')
            .when('/sites/:id', 'sitesEdit');

        $routeSegmentProvider
            .segment('sites', {
                templateUrl: bzConfig.templateUrl('/components/bcSites/backend/views/list.html'),
                controller: 'bcSites.Controllers.Main',
                //access: 'sites.can_manage'
            })
            .segment('sitesNew', {
                templateUrl: bzConfig.templateUrl('/components/bcSites/backend/views/edit.html'),
                controller: 'bcSites.Controllers.SiteEdit',
                //access: 'sites.can_manage'
            })
            .segment('sitesEdit', {
                templateUrl: bzConfig.templateUrl('/components/bcSites/backend/views/edit.html'),
                dependencies: ['id'],
                controller: 'bcSites.Controllers.SiteEdit',
                //access: 'sites.can_manage'
            });
    }]);
});
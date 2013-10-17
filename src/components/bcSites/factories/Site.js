define('components/bcSites/factories/Site', [
    'components/bcSites/app'
], function(app) {
    'use strict';

    app.factory('bcSites.Factories.Site', ['$resource', 'bzConfig', function ($resource, bzConfig) {
        return $resource(bzConfig.resource('/sites/:id'), { 'id': '@id' }, {
        });
    }]);

});
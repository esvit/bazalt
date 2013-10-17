define('components/bcSites/factories/Repository', [
    'components/bcSites/app'
], function(app) {
    'use strict';

    app.factory('bcSites.Factories.Repository', ['$resource', 'bzConfig', function ($resource, bzConfig) {
        return $resource(bzConfig.resource('/sites/:id/repository'), { 'id': '@id' }, {
            'update': { 'method': 'PUT' },
            'create': { 'method': 'POST' }
        });
    }]);

});
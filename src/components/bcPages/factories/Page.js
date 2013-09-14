define('components/bcPages/factories/Page', [
    'components/bcPages/app'
], function(app) {
    'use strict';

    app.factory('bcPages.Factories.Page', ['$resource', 'bzConfig', function ($resource, bzConfig) {
        return $resource(bzConfig.resource('/pages/:id'), { 'id': '@id' }, {
            'hit': { 'method': 'PUT', 'params': { 'action': 'view' } } // increase view counter
        });
    }]);

});
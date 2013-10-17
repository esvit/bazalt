define('components/bcPages/factories/Comment', [
    'components/bcPages/app'
], function(app) {
    'use strict';

    app.factory('bcPages.Factories.Comment', ['$resource', 'bzConfig', function ($resource, bzConfig) {
        return $resource(bzConfig.resource('/pages/:page_id/comments'), { 'page_id': '@page_id' }, {
            'hit': { 'method': 'PUT', 'params': { 'action': 'view' } } // increase view counter
        });
    }]);

});
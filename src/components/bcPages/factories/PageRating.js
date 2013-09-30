define('components/bcPages/factories/PageRating', [
    'components/bcPages/app'
], function(app) {
    'use strict';

    app.factory('bcPages.Factories.PageRating', ['$resource', 'bzConfig', function ($resource, bzConfig) {
        return $resource(bzConfig.resource('/pages/:page_id/rating'), {
            'page_id': '@page_id'
        }, {
        });
    }]);

});
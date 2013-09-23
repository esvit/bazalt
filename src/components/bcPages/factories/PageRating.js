define('components/bcPages/factories/PageRating', [
    'components/bcPages/app'
], function(app) {
    'use strict';

    app.factory('bcPages.Factories.PageRating', ['$resource', function ($resource) {
        return $resource('/api/rest.php/pages/:page_id/rating', {
            'page_id': '@page_id'
        }, {
        });
    }]);

});
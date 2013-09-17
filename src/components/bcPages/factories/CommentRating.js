define('components/bcPages/factories/CommentRating', [
    'components/bcPages/app'
], function(app) {
    'use strict';

    app.factory('bcPages.Factories.CommentRating', ['$resource', function ($resource) {
        return $resource('/api/rest.php/pages/:page_id/comments/:comment_id/rating', {
            'page_id': '@page_id',
            'comment_id': '@comment_id'
        }, {

        });
    }]);

});
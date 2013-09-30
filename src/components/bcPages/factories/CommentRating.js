define('components/bcPages/factories/CommentRating', [
    'components/bcPages/app'
], function(app) {
    'use strict';

    app.factory('bcPages.Factories.CommentRating', ['$resource', 'bzConfig', function ($resource, bzConfig) {
        return $resource(bzConfig.resource('/pages/:page_id/comments/:comment_id/rating'), {
            'page_id': '@page_id',
            'comment_id': '@comment_id'
        }, {

        });
    }]);

});
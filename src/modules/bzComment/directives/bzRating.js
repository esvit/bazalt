define('modules/bzComment/directives/bzRating', [
    'modules/bzComment/app',

    'angular',

    'components/bcPages/factories/CommentRating'
], function (app, angular) {
    'use strict';

    app.directive('bzRating', ['bcPages.Factories.CommentRating', function(CommentRatingResource) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                'count': '=bzRating',
                'commentId': '=commentId',
                'pageId': '=pageId'
            },
            templateUrl: '/src/modules/bzComment/views/bzRating.html',
            link: function(scope, element, attrs) {
                scope.count = scope.count || 0;

                scope.increment = function() {
                    CommentRatingResource.save({
                        page_id: scope.pageId,
                        comment_id: scope.commentId,
                        rating: 1
                    }, function(value) {
                        scope.count = value.rating;
                    });
                };

                scope.decrement = function() {
                    CommentRatingResource.save({
                        page_id: scope.pageId,
                        comment_id: scope.commentId,
                        rating: -1
                    }, function(value) {
                        scope.count = value.rating;
                    });
                };
            }
        };
    }]);

});
define('modules/bzComment/directives/bzRating', [
    'modules/bzComment/app',

    'angular',

    'components/bcPages/factories/CommentRating'
], function (app, angular) {
    'use strict';

    app.directive('bzRating', ['bcPages.Factories.CommentRating', 'bcPages.Factories.PageRating', 'bzConfig',
        function(CommentRatingResource, PageRatingResource, bzConfig) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                'count': '=bzRating',
                'commentId': '=commentId',
                'pageId': '=pageId'
            },
            templateUrl: bzConfig.templateUrl('/modules/bzComment/views/bzRating.html'),
            link: function(scope, element, attrs) {
                scope.count = scope.count || 0;

                var resource = (attrs.commentId) ?
                                    new CommentRatingResource({
                                        page_id: scope.pageId,
                                        comment_id: scope.commentId
                                    }) :
                                    new PageRatingResource({
                                        page_id: scope.pageId
                                    });

                scope.increment = function() {
                    scope.loading = true;
                    var res = angular.copy(resource);
                    res.rating = 1;
                    res.$save(function(value) {
                        scope.loading = false;
                        scope.count = value.rating;
                    });
                };

                scope.decrement = function() {
                    scope.loading = true;
                    var res = angular.copy(resource);
                    res.rating = -1;
                    res.$save(function(value) {
                        scope.loading = false;
                        scope.count = value.rating;
                    });
                };
            }
        };
    }]);

});
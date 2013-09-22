define('modules/bzComment/directives/bzComments', [
    'modules/bzComment/app'
], function (app) {
    'use strict';

    app.controller('bzComments.Controller', function() {

    });
    app.directive('bzComments', ['bcPages.Factories.Comment', 'bzConfig', function (CommentsResource, bzConfig) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                'pageId': '=bzComments'
            },
            templateUrl: bzConfig.templateUrl('/modules/bzComment/views/bzComments.html'),
            link: function (scope) {
                scope.comments = [];
                scope.settings = {
                    showReply: false
                };
                scope.$watch('pageId', function(value) {
                    if (angular.isDefined(value)) {
                        scope.loading = true;
                        CommentsResource.query({page_id: value}, function(comments) {
                            scope.comments = comments;
                            scope.loading = false;
                        });
                    }
                });
            }
        };
    }]);

});
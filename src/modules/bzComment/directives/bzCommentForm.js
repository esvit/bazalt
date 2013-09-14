define('modules/bzComment/directives/bzCommentForm', [
    'modules/bzComment/app'
], function (app) {

    app.directive('bzCommentForm', function() {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                'comments': '=bzCommentForm'
            },
            template: '<div>\
            <form class="add-comment" ng-submit="addComment(comment)">\
                <div class="name">\
                    <label>Имя</label>\
                    <input class="form-control" ng-model="comment.name" type="text">\
                </div>\
                <div class="message" form-control comments">\
                        <label>Сообщение</label>\
                        <textarea class="form-control" rows="3" ng-model="comment.comment"></textarea>\
                </div>\
                <input class="form-control btn btn-primary" type="submit" value="Добавить комментарий">\
            </form>\
            </div>',
            link: function(scope, element, attrs) {
                scope.comments = scope.comments || [];

                scope.addComment = function(comment) {
                    scope.comments.push(comment);
                    scope.comment = {};
                }
            }
        };
    });

});
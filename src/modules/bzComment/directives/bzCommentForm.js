define('modules/bzComment/directives/bzCommentForm', [
    'modules/bzComment/app',

    'components/bcPages/factories/Comment'
], function (app) {

    app.directive('bzCommentForm', ['bcPages.Factories.Comment', function(CommentResource) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                'comments': '=bzCommentForm',
                'pageId': '=pageId',
                'replyId': '=replyId'
            },
            template: '<div>\
            <form bz-loading-container="loading" class="add-comment" ng-submit="addComment(comment)">\
                <div ng-if="user.is_guest" class="control-group" ng-class="{\'error\': errors.nickname}" class="name">\
                    <label>Имя</label>\
                    <input class="form-control" ng-model="comment.nickname" type="text">\
                    <div ng-if="errors.nickname.required" class="help-block">Укажите Ваше имя</div>\
                </div>\
                <div ng-if="!user.is_guest" class="control-group" class="name">\
                    <div class="b-user">\
                    <a href=""><img src="http://placehold.it/50x50"></a>\
                    <b>UserName</b>\
                    </div>\
                </div>\
                <div class="control-group" ng-class="{\'error\': errors.body}" class="message">\
                    <label>Сообщение</label>\
                    <textarea class="form-control" rows="3" ng-model="comment.body"></textarea>\
                    <div ng-if="errors.body.required" class="help-block">Напишите сообщение</div>\
                </div>\
                <input class="form-control btn btn-primary" type="submit" value="Отправить">\
            </form>\
            </div>',
            link: function(scope) {
                scope.addComment = function(comment) {
                    scope.comments = scope.comments || [];

                    comment = new CommentResource(comment);
                    comment.page_id = scope.pageId;
                    comment.reply_to = scope.replyId;
                    scope.loading = true;
                    comment.$save(function(comment) {
                        scope.comments.push(comment);
                        scope.replyId = false;
                        scope.comment = {};
                        scope.loading = false;
                        scope.errors = false;
                    }, function(res) {
                        scope.loading = false;
                        if (res.status == 400) {
                            scope.errors = res.data;
                        }
                    });
                }
            }
        };
    }]);

});
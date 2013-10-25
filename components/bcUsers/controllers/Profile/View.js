define('components/bcUsers/controllers/Profile/View', [
    'components/bcUsers/app'
], function (app) {
    'use strict';

    app.controller('bcUsers.Controllers.Profile.View',
        ['$scope', 'bcUsers.Factories.User', '$rootScope', '$routeSegment', '$user',
            function ($scope, UserResource, $rootScope, $routeSegment, $user) {

                var userId = $routeSegment.$routeParams.user_id || $user.data.id;

                UserResource.get({ 'id': userId}, function(user) {
                    $scope.loading = false;
                    if (!user.images) {
                        user.images = [];
                    }
                    $scope.user = user;
                });
            }]);
});

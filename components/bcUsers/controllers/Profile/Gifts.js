define('components/bcUsers/controllers/Profile/Gifts', [
    'components/bcUsers/app',

    'components/bcUsers/factories/GiftResource'
], function (app) {
    'use strict';

    app.controller('bcUsers.Controllers.Profile.Gifts',
        ['$scope', 'bcUsers.Factories.User', '$rootScope', '$routeSegment', '$user', 'bcUsers.Factories.Gift',
            function ($scope, UserResource, $rootScope, $routeSegment, $user, GiftResource) {
                $scope.loading = true;
                GiftResource.get({ 'user_id': $user.data.id }, function(res) {
                    $scope.loading = false;
                    $scope.gifts = res.data;
                });
            }]);
});

define('components/bcUsers/controllers/Profile/Gifts', [
    'components/bcUsers/app'
], function (app) {
    'use strict';

    app.controller('bcUsers.Controllers.Profile.Gifts',
        ['$scope', 'bcUsers.Factories.User', '$rootScope', '$routeSegment', '$user', 'bcUsers.Factories.Gift',
            function ($scope, UserResource, $rootScope, $routeSegment, $user, GiftResource) {
                $scope.loading = true;
                GiftResource.get(function(res) {
                    $scope.loading = false;
                    $scope.gifts = res.data;
                });
            }]);
});

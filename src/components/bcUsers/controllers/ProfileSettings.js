define('components/bcUsers/controllers/ProfileSettings', [
    'components/bcUsers/app'
], function (app) {
    'use strict';

    app.controller('bcUsers.Controllers.ProfileSettings',
        ['$scope', 'bcUsers.Factories.User', '$rootScope',
            function ($scope, UserResource, $rootScope) {
            UserResource.get({ 'id': $rootScope.user.id }, function(user) {
                $scope.loading = false;
                if (!user.images) {
                    user.images = [];
                }
                $scope.user = user;
            });

            $scope.saveUser = function(user) {
                var user = new UserResource(user);
                $scope.loading = true;
                user.$save(function(user) {
                    $scope.loading = false;
                }, function(res) {
                    $scope.loading = false;
                    if (res.status == 400) {
                        $scope.errors = res.data;
                    }
                });
            }
        }]);
});
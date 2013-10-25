define('components/bcUsers/controllers/Profile/Edit', [
    'components/bcUsers/app'
], function (app) {
    'use strict';

    app.controller('bcUsers.Controllers.Profile.Edit',
        ['$scope', 'bcUsers.Factories.User', '$rootScope', '$location', '$user',
            function ($scope, UserResource, $rootScope, $location, $user) {

                UserResource.get({ 'id': $user.data.id }, function(user) {
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
                        $location.path('/user/profile');
                    }, function(res) {
                        $scope.loading = false;
                        if (res.status == 400) {
                            $scope.errors = res.data;
                        }
                    });
                }
            }]);
});
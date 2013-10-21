define('components/bcUsers/controllers/Profile/ChangePassword', [
    'components/bcUsers/app'
], function (app) {
    'use strict';

    app.controller('bcUsers.Controllers.Profile.ChangePassword',
        ['$scope', '$rootScope', '$location', 'bcUsers.Factories.User', '$routeSegment', '$user',
            function ($scope, $rootScope, $location, UserResource, $routeSegment, $user) {

                $scope.changed = false;
                $scope.profile = {};
                $scope.changePassword = function(profile) {
                    $scope.loading = true;
                    UserResource.changePassword({
                        'id': $user.data.id,
                        'old_password': profile.old_password,
                        'new_password': profile.new_password
                    }, function(user) {
                        $scope.loading = false;
                        $scope.changed = true;
                        $scope.errors = null;
                        $scope.profile = {};
                    }, function(res) {
                        $scope.loading = false;
                        if (res.status == 400) {
                            $scope.errors = res.data;
                        }
                    });
                }

            }]);

});
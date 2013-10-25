define('components/bcUsers/controllers/Login', [
    'components/bcUsers/app'
], function (app) {
    'use strict';

    app.controller('bcUsers.Controllers.Login',
        ['$scope', '$location', '$user',
            function ($scope, $location, $user) {
                $scope.loginUser = function(user) {
                    $scope.loading = true;
                    $user.login(user, function(user) {
                        $scope.loading = false;

                        $location.path('/user/' + user.id + '/profile');
                    }, function(res) {
                        $scope.loading = false;
                        if (res.status == 400) {
                            $scope.errors = res.data;
                        }
                    });
                };

            }]);

});
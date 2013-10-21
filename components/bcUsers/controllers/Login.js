define('components/bcUsers/controllers/Login', [
    'components/bcUsers/app'
], function (app) {
    'use strict';

    app.controller('bcUsers.Controllers.Login',
        ['$scope', '$location', '$user',
            function ($scope, $location, $user) {
                $scope.user = {
                    'login': 'oll.rudenko@gmail.com',
                    'password': 'awdawd'
                };

                $scope.loginUser = function(user) {
                    $scope.loading = true;
                    $user.login(user, function() {
                        $scope.loading = false;

                        $location.path('/user/profile');
                    }, function(res) {
                        $scope.loading = false;
                        if (res.status == 400) {
                            $scope.errors = res.data;
                        }
                    });
                };

            }]);

});
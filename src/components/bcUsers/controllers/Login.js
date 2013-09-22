define('components/bcUsers/controllers/Login', [
    'components/bcUsers/app'
], function (app) {
    'use strict';

    app.controller('bcUsers.Controllers.Login',
        ['$scope', 'baAcl', '$location',
            function ($scope, baAcl, $location) {
                $scope.user = {
                    'login': 'oll.rudenko@gmail.com',
                    'password': 'awdawd'
                };

                $scope.loginUser = function(user) {
                    $scope.loading = true;
                    baAcl.login(user, function() {
                        $scope.loading = false;

                        $location.path('/user/profile');
                    }, function(res) {
                        if (res.status == 400) {
                            $scope.errors = res.data;
                        }
                    });
                };

            }]);

});
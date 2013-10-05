define('backend/controllers/Login', [
    'backend/app',

    'bootstrap/modal'
], function(app) {
    'use strict';

    app.controller('Backend.Controllers.Login', ['$scope', '$user', '$location', function($scope, $user, $location) {
        $scope.loginUser = $user;
        $scope.login = function(user) {
            $scope.loading = true;
            user.login(function() {
                $scope.errors = false;
                $scope.loading = false;
                $location.path('/');
            }, function(res){
                $scope.loading = false;
                if (res.status == 400) {
                    $scope.errors = res.data;
                }
            });
        };
    }]);
});
define('components/bcUsers/controllers/Activation', [
    'components/bcUsers/app'
], function (app) {
    'use strict';

    app.controller('bcUsers.Controllers.Activation',
        ['$scope', '$rootScope', '$location', 'bcUsers.Factories.User', '$routeSegment',
            function ($scope, $rootScope, $location, UserResource, $routeSegment) {

                $scope.loading = true;
                UserResource.activate({
                    'id': $routeSegment.$routeParams.user_id,
                    'key':     $routeSegment.$routeParams.key
                }, function(user) {
                    $scope.loading = false;
                    $rootScope.user_activated = true;
                    $location.path('/user/login');
                }, function(res) {
                    $scope.loading = false;
                    if (res.status == 400) {
                        $scope.errors = res.data
                    } else {
                        $scope.error = true;
                    }
                });

            }]);

});
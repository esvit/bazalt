define('components/bcUsers/controllers/Activation', [
    'components/bcUsers/app'
], function (app) {
    'use strict';

    app.controller('bcUsers.Controllers.Activation',
        ['$scope', '$rootScope', '$location', 'bcUsers.Factories.User', '$routeSegment',
            function ($scope, $rootScope, $location, UserResource, $routeSegment) {

                UserResource.activate({
                    'id': $routeSegment.$routeParams.user_id,
                    'key':     $routeSegment.$routeParams.key
                }, function(user) {
                    $rootScope.user_activated = true;
                    $location.path('/user/login');
                }, function(res) {
                    console.info(res);
                });

            }]);

});
define('components/bcUsers/controllers/Profile/Message', [
    'components/bcUsers/app',

    'components/bcUsers/factories/MessageResource'
], function (app) {
    'use strict';

    app.controller('bcUsers.Controllers.Profile.Message',
        ['$scope', 'ngTableParams', '$routeSegment', 'bcUsers.Factories.Message', '$user',
            function ($scope, ngTableParams, $routeSegment, MessageResource, $user) {

                $scope.loading = true;
                MessageResource.get({'id': $routeSegment.$routeParams.id, 'userId': $user.data.id}, function(data) {
                    $scope.loading = false;
                    $scope.message = data;
                });

            }]);

});
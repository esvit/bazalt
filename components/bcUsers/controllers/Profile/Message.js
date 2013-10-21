define('components/bcUsers/controllers/Profile/Message', [
    'components/bcUsers/app',

    'components/bcUsers/factories/MessageResource'
], function (app) {
    'use strict';

    app.controller('bcUsers.Controllers.Profile.Message',
        ['$scope', 'ngTableParams', '$routeSegment', 'bcUsers.Factories.Message', '$user', '$location',
            function ($scope, ngTableParams, $routeSegment, MessageResource, $user, $location) {

                $scope.loading = true;
                MessageResource.get({'id': $routeSegment.$routeParams.id, 'userId': $user.data.id}, function(data) {
                    $scope.loading = false;
                    $scope.message = data;
                });
                $scope.sendMessage = function(message) {
                    message.user_id = $user.data.id;
                    message.to_id = $scope.message.from_id;
                    var reply = new MessageResource(message);
                    reply.$send(function() {
                        $location.path('/user/profile/messages');
                    });
                };
            }]);

});
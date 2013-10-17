define('components/bcUsers/controllers/Profile/View', [
    'components/bcUsers/app'
], function (app) {
    'use strict';

    app.controller('bcUsers.Controllers.Profile.View',
        ['$scope', 'bcUsers.Factories.User', '$rootScope',
            function ($scope, UserResource, $rootScope) {

                UserResource.get({ 'id': $rootScope.user.id }, function(user) {
                    $scope.loading = false;
                    if (!user.images) {
                        user.images = [];
                    }
                    $scope.user = user;
                });
            }]);
});

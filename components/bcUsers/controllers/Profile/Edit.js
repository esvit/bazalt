define('components/bcUsers/controllers/Profile/Edit', [
    'components/bcUsers/app'
], function (app) {
    'use strict';

    app.controller('bcUsers.Controllers.Profile.Edit',
        ['$scope', 'bcUsers.Factories.User', '$rootScope', '$location', '$user',
            function ($scope, UserResource, $rootScope, $location, $user) {

                $scope.user = UserResource.get({ 'id': $user.data.id }, function(user) {
                    $scope.loading = false;
                    if (!user.images) {
                        //user.images = [];
                    }
                    $scope.user = user;
                });

                $scope.saveUser = function(user) {
                    var user = new UserResource(user);
                    $scope.loading = true;
                    user.$save(function(user) {
                        $scope.loading = false;
                        $location.path('/user/' + user.id + '/profile');
                    }, function(res) {
                        $scope.loading = false;
                        if (res.status == 400) {
                            $scope.errors = res.data;
                        }
                    });
                };

                $scope.addChildren = function (user) {
                    user.children = [];
                    for (var i = 0; i < user.children_count; i++) {
                        user.children.push({

                        });
                    }
                };
                $scope.weights = [];
                for (var i = 40; i <= 120; i++) {
                    $scope.weights.push({
                        'kg': i,
                        'pounds': Math.round(i * 2.2046)
                    })
                };
                $scope.years = [];
                for (var i = 18; i <= 75; i++) {
                    $scope.years.push({
                        'year': i
                    })
                }

            }]);
});
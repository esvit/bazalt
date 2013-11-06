define('components/bcUsers/controllers/Profile/Edit', [
    'components/bcUsers/app'
], function (app) {
    'use strict';

    app.controller('bcUsers.Controllers.Profile.Edit',
        ['$scope', 'bcUsers.Factories.User', '$rootScope', '$location', '$user',
            function ($scope, UserResource, $rootScope, $location, $user) {

                $scope.gift = {"item_id":"32","gift_id":"1","user_id":"23","to_id":"22","message":"","status":0,"created_at":"1383640261000","updated_at":"1383640261000","to":{"id":"22","login":"oll.rudenko@gmail.com","firstname":"Виктория","secondname":"Кирова","patronymic":null,"avatar":"/uploads/5b/49/5b4910c2cea3912cb8e657c73bfc8e1a.jpg","email":"oll.rudenko@gmail.com","gender":"female","birth_date":"18.06.1987","is_active":true,"is_deleted":false,"last_activity":"2013-11-05 15:10:06","created_at":"2013-11-03 16:17:24","fullname":"Кирова Виктория","permissions":[]},"from":{"id":"23","login":"my.impik@gmail.com","firstname":"Дмитрий","secondname":"Кунин","patronymic":null,"avatar":"/uploads/22/b6/22b61b12b9cd20d035716d678d76bebc.jpg","email":"my.impik@gmail.com","gender":"male","birth_date":"11.06.1980","is_active":true,"is_deleted":false,"last_activity":"2013-11-06 13:49:18","created_at":"2013-11-03 17:08:39","fullname":"Кунин Дмитрий","permissions":[]}};
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
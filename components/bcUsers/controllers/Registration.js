define('components/bcUsers/controllers/Registration', [
    'components/bcUsers/app',
    'ngModel'
], function (app) {
    'use strict';

    app.controller('setMain', ['$scope', function($scope) {
        $scope.setMainPhoto = function(images, n) {
            for (var i = 0; i < images.length; i++) {
                images[i].is_main = n == i;
            }
        }
    }]);
    app.controller('bcUsers.Controllers.Registration',
        ['$scope', 'bcUsers.Factories.User', '$q', '$location',
            function ($scope, UserResource, $q, $location) {
                $scope.user = {};
                $scope.registerUser = function () {
                    var user = new UserResource($scope.user);
                    $scope.loading = true;
                    user.$register(function (res) {
                        $scope.loading = false;
                        $location.path('/user/activationSent');
                    }, function (res) {
                        $scope.loading = false;
                        if (res.status == 400) {
                            $scope.errors = res.data;
                        }
                    });
                };
                $scope.checkEmail = function (email) {
                    var d = $q.defer();
                    UserResource.checkEmail({ 'email': email }, function (data) {
                        d.resolve(data.valid);
                    }, function (error) {
                        d.reject(error);
                    });
                    return d.promise;
                };
                $scope.resendActivation = function () {
                    $http.post('/account/resendActivation', $scope.form)
                        .success(function (data) {
                            $location.path('/activationResent');
                        })
                        .error(function (data, status, headers, config) {
                            $scope.error = data.error.message;
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
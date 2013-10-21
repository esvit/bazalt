define('components/bcUsers/controllers/Registration', [
    'components/bcUsers/app'
], function (app) {
    'use strict';

    app.controller('bcUsers.Controllers.Registration',
        ['$scope', 'bcUsers.Factories.User', '$q',
            function ($scope, UserResource, $q) {
                $scope.user = {};
                $scope.registerUser = function () {
                    var user = new UserResource($scope.user);
                    $scope.loading = true;
                    user.$register(function(res) {
                        $scope.loading = false;
                        $location.path('/user/activationSent');
                    }, function(res) {
                        if (res.status == 400) $scope.register.invalidForm(res.data);
                    });
                };
                $scope.checkEmail = function(email) {
                    var d = $q.defer();
                    UserResource.checkEmail({ 'email': email }, function(data) {
                        d.resolve(data.valid);
                    }, function(error) {
                        d.reject(error);
                    });
                    return d.promise;
                };
                $scope.resendActivation = function () {
                    $http.post('/account/resendActivation', $scope.form)
                        .success(function(data) {
                            $location.path('/activationResent');
                        })
                        .error(function(data, status, headers, config) {
                            $scope.error = data.error.message;
                        });
                };
            }]);


});
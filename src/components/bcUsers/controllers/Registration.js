define('components/bcUsers/controllers/Registration', [
    'components/bcUsers/app'
], function (app) {
    'use strict';

    app.controller('bcUsers.Controllers.Registration',
        ['$scope', 'bcUsers.Factories.User', '$q',
            function ($scope, UserResource, $q) {
                $scope.user = new UserResource({
                    'email': 'esvit666@gmail.com',
                    'password': 'awdawd',
                    'spassword': 'awdawd',
                    'firstname': 'Olga',
                    'secondname': 'Rudenko',
                    'birth_date': '12.05.1988'
                });

                $scope.saveUser = function(user) {
                    user.login = user.email;
                    user.gender = 'unknown';
                    user.is_active = 1;
                    user.firstname = user.firstname;
                    user.secondname = user.secondname;
                    user.birth_date = user.birth_date;
                    user.$save(function(res){
                        console.info(res);
                    }, function(err){
                        if (err.status == 400) {
                            $scope.formError = err.data;
                        }
                    })
                };

                $scope.checkEmail = function(email) {
                    var d = $q.defer();
                    UserResource.checkEmail({ 'email': email }, function(data) {
                        d.resolve(data.valid);
                    }, function(error) {
                        d.reject(error);
                    });
                    return d;
                };

            }]);


});
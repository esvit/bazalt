define('components/bcUsers/controllers/Registration', [
    'components/bcUsers/app'
], function (app) {
    'use strict';

    app.controller('bcUsers.Controllers.Registration',
        ['$scope', 'bcUsers.Factories.User',
            function ($scope, UserResource) {
                $scope.user = new UserResource({
                    'email': 'oll.rudenko@gmail.com',
                    'password': 'awdawd',
                    'spassword': 'awdawd',
                    'firstname': 'Olga',
                    'secondname': 'Rudenko',
                    'birth_date': '12.05.1988',
                    'city': 'Vinnitsa'
                });

                $scope.saveUser = function(user) {
                    user.login = user.email;
                    user.gender = 'unknown';
                    user.is_active = 1;
                    user.firstname = 'Olga';
                    user.secondname = 'Rudenko';
                    user.birth_date = '12.03.06';
                    user.city = 'Vinnitsa';
                    user.$save(function(res){
                        console.info(res);
                    }, function(err){
                        if (err.status == 400) {
                            $scope.formError = err.data;
                        }
                    })
                }

            }]);


});
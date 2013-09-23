define('components/bcUsers/controllers/ProfileSettings', [
    'components/bcUsers/app'
], function (app) {
    'use strict';

    app.controller('bcUsers.Controllers.ProfileSettings',
        ['$scope', 'bcUsers.Factories.User',
            function ($scope, UserResource) {
                $scope.user = new UserResource({
                    'email': 'oll.rudenko@gmail.com',
                    'password': 'awdawd',
                    'spassword': 'awdawd',
                    'firstname': 'Olga',
                    'secondname': 'Rudenko',
                    'birth_date': '12.05.1988'
                });

            /*UserResource.get({ 'id': $routeParams.id }, function(user) {
                $scope.loading = false;
                if (!user.images) {
                    user.images = [];
                }
                $scope.user = user;
            });*/

            $scope.saveUser = function(user) {
                var user = new UserResource(user);
                $scope.loading = true;
                user.$save(function(user) {
                    console.info(user);
                    /*user.$save(function(res){
                        console.info(res);
                    }, function(err){
                        if (err.status == 400) {
                            $scope.formError = err.data;
                        }
                    })*/
                    $scope.loading = false;
                });
            }
        }]);
});
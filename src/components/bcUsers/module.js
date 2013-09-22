define('components/bcUsers/module', [
    'components/bcUsers/app',

    'components/bcUsers/factories/UserResource',

    'components/bcUsers/controllers/Registration',
    'components/bcUsers/controllers/Login',
    'components/bcUsers/controllers/ProfileSettings'
], function (app) {
    'use strict';

    app.config(['$routeSegmentProvider', 'bzConfigProvider', 'bzWidgetsProvider',
        function ($routeSegmentProvider, bzConfigProvider, bzWidgetsProvider) {

            $routeSegmentProvider
                .when('/user', 'profile')
                .when('/user/registration', 'registration')
                .when('/user/login', 'login')
                .when('/user/profile', 'profile.view')
                .when('/user/profile/view', 'profile.view')
                .when('/user/profile/edit', 'profile.edit')
                .when('/user/profile/avatar', 'profile.avatar')
                .when('/user/profile/password', 'profile.password')
                .when('/user/profile/public', 'profile.public');

            $routeSegmentProvider
                /*.segment('user', {
                    templateUrl: bzConfigProvider.templateUrl('/views/layout.html')
                })*/
                .segment('profile', {
                    templateUrl: bzConfigProvider.templateUrl('/views/user/profile.html'),
                    controller: function ($scope) {
                        $scope.$watch('user', function(value){
                            console.info(value);
                        });
                    }
                })
                .segment('registration', {
                    templateUrl: bzConfigProvider.templateUrl('/views/user/account/registerForm.html'),
                    controller: 'bcUsers.Controllers.Registration'
                })
                .segment('login', {
                    templateUrl: bzConfigProvider.templateUrl('/views/user/account/loginForm.html'),
                    controller: 'bcUsers.Controllers.Login'
                })
                .segment('profile', {
                    templateUrl: bzConfigProvider.templateUrl('/views/user/profile.html'),
                    controller: 'bcUsers.Controllers.ProfileSettings'
                })
                    .within()
                    .segment('view', {
                        templateUrl: bzConfigProvider.templateUrl('/views/user/profile/view.html'),
                        controller: 'bcUsers.Controllers.ProfileSettings'
                    })
                .up()
                    .within()
                    .segment('edit', {
                        templateUrl: bzConfigProvider.templateUrl('/views/user/profile/edit/profile.html'),
                        controller: 'bcUsers.Controllers.ProfileSettings'
                    })
                .up()
                    .within()
                    .segment('avatar', {
                        templateUrl: bzConfigProvider.templateUrl('/views/user/profile/edit/avatar.html'),
                        controller: 'bcUsers.Controllers.ProfileSettings'
                    })
                .up()
                    .within()
                    .segment('password', {
                        templateUrl: bzConfigProvider.templateUrl('/views/user/profile/edit/password.html'),
                        controller: 'bcUsers.Controllers.ProfileSettings'
                    })
                .up()
                    .within()
                    .segment('public', {
                        templateUrl: bzConfigProvider.templateUrl('/views/user/profile/public.html'),
                        controller: 'bcUsers.Controllers.ProfileSettings'
                    });
        }]);

});
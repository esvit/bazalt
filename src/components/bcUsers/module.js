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
                .when('/user', 'main.profile')
                .when('/user/registration', 'main.registration')
                .when('/user/login', 'main.login')
                .when('/user/profile', 'main.profile.view')
                .when('/user/profile/view', 'main.profile.view')
                .when('/user/profile/edit', 'main.profile.edit')
                .when('/user/profile/avatar', 'main.profile.avatar')
                .when('/user/profile/password', 'main.profile.password')
                .when('/user/profile/public', 'main.profile.public');

            $routeSegmentProvider
                /*.segment('user', {
                    templateUrl: bzThemeProvider.templateUrl('/views/layout.html')
                })*/
                .within('main')
                .segment('profile', {
                    templateUrl: bzConfigProvider.templateUrl('/views/user/profile.html'),
                    controller: function ($scope) {
                        $scope.$watch('user', function(value){
                            console.info(value);
                        });
                    }
                })
                .up()
                .within()
                .segment('registration', {
                    templateUrl: bzConfigProvider.templateUrl('/views/user/account/registerForm.html'),
                    controller: 'bcUsers.Controllers.Registration'
                })
                .up()
                .within()
                .segment('login', {
                    templateUrl: bzConfigProvider.templateUrl('/views/user/account/loginForm.html'),
                    controller: 'bcUsers.Controllers.Login'
                })
                .up()
                .within()
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
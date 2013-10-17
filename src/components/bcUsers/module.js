define('components/bcUsers/module', [
    'angular',
    'components/bcUsers/app',

    'components/bcUsers/config',

    'components/bcUsers/factories/UserResource',

    'components/bcUsers/controllers/Registration',
    'components/bcUsers/controllers/Login',
    'components/bcUsers/controllers/ProfileSettings',
    'components/bcUsers/controllers/Activation',
    'components/bcUsers/controllers/Profile/ChangePassword',
    'components/bcUsers/controllers/Profile/Edit',
    'components/bcUsers/controllers/Profile/View'
], function (angular, app) {
    'use strict';

    app.config(['$routeSegmentProvider', 'bzConfigProvider',
        function ($routeSegmentProvider, bzConfigProvider) {

            $routeSegmentProvider
                .when('/user', 'profile')
                .when('/user/registration', 'registration')
                .when('/user/login', 'login')
                .when('/user/activation/:user_id/:key', 'activation')
                .when('/user/profile', 'profile.view')
                .when('/user/profile/view', 'profile.view')
                .when('/user/profile/edit', 'profile.edit')
                .when('/user/profile/password', 'profile.password');

            $routeSegmentProvider
                /*.segment('user', {
                    templateUrl: bzConfigProvider.templateUrl('/views/layout.html')
                })*/
                .segment('profile', {
                    templateUrl: bzConfigProvider.templateUrl('/views/user/profile.html'),
                    controller: function ($scope) {
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
                .segment('activation', {
                    templateUrl: bzConfigProvider.templateUrl('/views/user/account/activation.html'),
                    controller: 'bcUsers.Controllers.Activation'
                })
                .segment('profile', {
                    templateUrl: bzConfigProvider.templateUrl('/views/user/profile.html'),
                    controller: 'bcUsers.Controllers.ProfileSettings'
                })
                    .within()
                    .segment('view', {
                        templateUrl: bzConfigProvider.templateUrl('/views/user/profile/view.html'),
                        controller: 'bcUsers.Controllers.Profile.View'
                    })
                .up()
                    .within()
                    .segment('edit', {
                        templateUrl: bzConfigProvider.templateUrl('/views/user/profile/edit/profile.html'),
                        controller: 'bcUsers.Controllers.Profile.Edit'
                    })
                .up()
                    .within()
                    .segment('password', {
                        templateUrl: bzConfigProvider.templateUrl('/views/user/profile/edit/password.html'),
                        controller: 'bcUsers.Controllers.Profile.ChangePassword'
                    });
        }]);
});
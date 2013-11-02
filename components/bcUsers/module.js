define('components/bcUsers/module', [
    'angular',
    'components/bcUsers/app',

    'components/bcUsers/config',

    'components/bcUsers/factories/UserResource',

    'components/bcUsers/controllers/Registration',
    'components/bcUsers/controllers/Login',
    'components/bcUsers/controllers/ProfileSettings',
    'components/bcUsers/controllers/Activation',
    'components/bcUsers/controllers/Users',
    'components/bcUsers/controllers/RecoveryPassword',
    'components/bcUsers/controllers/Profile/ChangePassword',
    'components/bcUsers/controllers/Profile/Gifts',
    'components/bcUsers/controllers/Profile/Edit',
    'components/bcUsers/controllers/Profile/Messages',
    'components/bcUsers/controllers/Profile/Message',
    'components/bcUsers/controllers/Profile/ModalGifts',
    'components/bcUsers/controllers/Profile/View'
], function (angular, app) {
    'use strict';

    app.config(['$routeSegmentProvider', 'bzConfigProvider',
        function ($routeSegmentProvider, bzConfigProvider) {

            $routeSegmentProvider

                .when('/user', 'profile')
                .when('/user/registration', 'registration')
                .when('/user/login', 'login')
                .when('/user/activate/:user_id/:key', 'activation')
                .when('/user/activationSent', 'activationSent')
                .when('/user/recovery', 'recovery')
                .when('/users/', 'users')
                .when('/user/:user_id/profile', 'profile.view')
                .when('/user/:user_id/view', 'profile.view')
                .when('/user/:user_id/edit', 'profile.edit')
                .when('/user/:user_id/gifts', 'profile.gifts')
                .when('/user/:user_id/password', 'profile.password')
                .when('/user/:user_id/messages', 'profile.messages.inbox')
                .when('/user/:user_id/messages/outbox', 'profile.messages.outbox')
                .when('/user/:user_id/messages/:id', 'profile.message');

            $routeSegmentProvider
                /*.segment('user', {
                    templateUrl: bzConfigProvider.templateUrl('/views/layout.html')
                })*/
                .segment('profile', {
                    templateUrl: bzConfigProvider.templateUrl('/views/user/profile.html'),
                    controller: function ($scope) {
                    }
                })
                .segment('users', {
                    templateUrl: bzConfigProvider.templateUrl('/views/user/users.html'),
                    controller: 'bcUsers.Controllers.Users'
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
                .segment('activationSent', {
                    templateUrl: bzConfigProvider.templateUrl('/views/user/account/registerSuccessMessage.html'),
                    //controller: 'bcUsers.Controllers.Activation'
                })
                .segment('recovery', {
                    templateUrl: bzConfigProvider.templateUrl('/views/user/account/recoveryPassword.html'),
                    controller: 'bcUsers.Controllers.RecoveryPassword'
                })
                .segment('profile', {
                    templateUrl: bzConfigProvider.templateUrl('/views/user/profile.html'),
                    controller: 'bcUsers.Controllers.ProfileSettings',
                    dependencies: ['user_id']
                })
                .within()
                    .segment('view', {
                        templateUrl: bzConfigProvider.templateUrl('/views/user/profile/view.html'),
                        controller: 'bcUsers.Controllers.Profile.View',
                        dependencies: ['user_id']
                    })
                .up()
                .within()
                    .segment('gifts', {
                        templateUrl: bzConfigProvider.templateUrl('/views/user/profile/gifts.html'),
                        controller: 'bcUsers.Controllers.Profile.Gifts',
                        dependencies: ['user_id']
                    })
                .up()
                    .within()
                    .segment('edit', {
                        templateUrl: bzConfigProvider.templateUrl('/views/user/profile/edit/profile.html'),
                        controller: 'bcUsers.Controllers.Profile.Edit',
                        dependencies: ['user_id']
                    })
                .up()
                    .within()
                    .segment('password', {
                        templateUrl: bzConfigProvider.templateUrl('/views/user/profile/edit/password.html'),
                        controller: 'bcUsers.Controllers.Profile.ChangePassword',
                        dependencies: ['user_id']
                    })
                .up()
                    .within()
                    .segment('message', {
                        templateUrl: bzConfigProvider.templateUrl('/views/user/profile/message.html'),
                        controller: 'bcUsers.Controllers.Profile.Message',
                        dependencies: ['user_id','id']
                    })
                .up()
                .within()
                .segment('messages', {
                    templateUrl: bzConfigProvider.templateUrl('/views/user/profile/messages.html')
                })
                        .within()
                        .segment('inbox', {
                            controller: 'bcUsers.Controllers.Profile.Messages',
                            dependencies: ['user_id']
                        })
                        .up()
                        .within()
                        .segment('outbox', {
                            controller: 'bcUsers.Controllers.Profile.Messages',
                            dependencies: ['user_id']
                        })
        }]);
});
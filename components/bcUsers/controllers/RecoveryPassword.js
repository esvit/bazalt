define('components/bcUsers/controllers/RecoveryPassword', [
    'angular',

    'components/bcUsers/app'
], function (angular, app) {
    'use strict';

    app.controller('bcUsers.Controllers.RecoveryPassword',
        ['$scope', 'bcUsers.Factories.User', '$rootScope', '$fileUploader', '$parse', '$user',
            function ($scope, UserResource, $rootScope, $fileUploader, $parse, $user) {

        }]);
});
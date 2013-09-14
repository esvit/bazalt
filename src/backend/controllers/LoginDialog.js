define('backend/controllers/LoginDialog', [
    'backend/app',

    'bootstrap/modal'
], function(app) {
    'use strict';

    app.controller('Backend.Controllers.LoginDialog', ['$scope', 'baAcl', function($scope, baAcl) {
        $scope.login = function(user) {
            $scope.loading = true;
            baAcl.login(user, function() {
                $scope.loading = false;
            });
        };
    }]);
});
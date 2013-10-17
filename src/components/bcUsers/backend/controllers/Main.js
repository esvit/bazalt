define('components/bcUsers/backend/controllers/Main', [
    'components/bcUsers/backend/app'
], function (app) {
    'use strict';

    app.controller('bcUsers.Controllers.Main', ['$scope', '$location', 'bcUsers.Factories.User', 'ngTableParams',
        function ($scope, $location, baUserResource, ngTableParams) {

            var tableParams = {
                page: 1,
                count: 10,
                counts: []
            };

            $scope.tableParams = new ngTableParams(angular.extend(tableParams, $location.search()));
            $scope.$watch('tableParams', function (params) {
                var urlParams = angular.copy(params.url());

                $location.search(urlParams);

                baUserResource.get(params.url(), function (result) {
                    $scope.tableParams.total = result.pager.total;
                    $scope.users = result.data;
                });
            }, true);

            $scope.toggleActive = function (user) {
                var u = new baUserResource(user);
                $scope.loading = true;
                u.$save(function() {
                    $scope.loading = false;
                });
            };

            $scope.deleteUser = function (user) {
                user.$deleting = true;
                var u = new baUserResource(user);
                u.$delete(function() {
                    user.$deleting = false;
                    user.is_deleted = 1;
                });
            };
            $scope.restoreUser = function (user) {
                user.$deleting = true;
                var u = new baUserResource(user);
                u.is_deleted = 0;
                u.$save(function() {
                    user.$deleting = false;
                    user.is_deleted = 0;
                });
            };
        }]);


});
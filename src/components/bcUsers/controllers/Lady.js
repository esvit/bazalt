define('components/bcUsers/controllers/Lady', [
    'components/bcUsers/app'
], function (app) {
    'use strict';

    app.factory('ProfilesResource', ['$resource', function ($resource) {
        return $resource('/api/rest.php/profiles/:id', { 'id': '@id' }, {
        });
    }]);

    app.controller('bcUsers.Controllers.Lady',
        ['$scope', '$location', 'baUserResource', 'ngTableParams', 'ProfilesResource',
        function ($scope, $location, baUserResource, ngTableParams, ProfilesResource) {

            if (!$scope.user.login) {
                $location.path('/');
            }

            var tableParams = {
                page: 1,
                count: 10,
                counts: []
            };

            $scope.tableParams = new ngTableParams(angular.extend(tableParams, $location.search()));
            $scope.$watch('tableParams', function (params) {
                var urlParams = angular.copy(params.url());

                $location.search(urlParams);

                ProfilesResource.get(params.url(), function (result) {
                    $scope.tableParams.total = result.pager.total;
                    $scope.users = result.data;
                });
            }, true);

        }]);


});
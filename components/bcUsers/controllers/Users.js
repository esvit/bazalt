define('components/bcUsers/controllers/Users', [
    'angular',

    'components/bcUsers/app'
], function (angular, app) {
    'use strict';

    app.controller('bcUsers.Controllers.Users',
        ['$scope', 'bcUsers.Factories.User', 'ngTableParams', '$fileUploader', '$parse', '$user', '$routeSegment',
            function ($scope, UserResource, ngTableParams, $fileUploader, $parse, $user, $routeSegment) {
                $scope.tableParams = new ngTableParams({
                    page: 1,            // show first page
                    count: 10           // count per page
                }, {
                    total: 0, // length of data
                    getData: function($defer, params) {
                        var data = params.url();
                        data['filter[gender]'] = 'female';
                        UserResource.get(data, function (res) {
                            $defer.resolve($scope.users = res.data);
                        });
                    }
                });
            }]);

});
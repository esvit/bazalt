define('components/bcPages/controllers/UserPosts', [
    'components/bcPages/app'
], function (app) {
    'use strict';

    app.controller('bcPages.Controllers.UserPosts',
        ['$scope', '$routeSegment', 'bcPages.Factories.Page', 'ngTableParams',
            function ($scope, $routeSegment, PageResource, ngTableParams) {
                $scope.$routeSegment = $routeSegment;

                $scope.tableOptions = new ngTableParams({
                    page: 1,            // show first page
                    total: 0,           // length of data
                    count: 10,          // count per page
                    sorting: {
                        name: 'asc'     // initial sorting
                    }
                });

                $scope.filterByCategory = function(category) {
                    $scope.category_id = (category) ? category.id : null;
                    $scope.tableOptions.category_id = $scope.category_id;
                };

                $scope.$watch('tableOptions', function(params) {
                    $scope.loading = true;

                    var param = params.url();
                    // ajax request to api
                    PageResource.get(param, function(data) {
                        $scope.loading = false;
                        // set new data
                        $scope.items = data.data;

                        // update table params
                        $scope.tableOptions.total = data.total;
                    });
                }, true);
            }]);

});

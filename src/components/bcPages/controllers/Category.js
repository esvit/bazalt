define('components/bcPages/controllers/Category', [
    'components/bcPages/app'
], function(app) {
    'use strict';

    app.controller('bcPages.Controllers.Category',
        ['$scope', 'category', 'bcPages.Factories.Page', '$log', 'ngTableParams',
            function($scope, category, PagesResource, $log, ngTableParams) {
                $log.info('Components.Pages.Category', category);

                $scope.loading = true;
                $scope.category = category;

                $scope.tableParams = new ngTableParams({
                    page: 1,            // show first page
                    total: 0,           // length of data
                    count: 10,          // count per page
                    sorting: {
                        name: 'asc'     // initial sorting
                    }
                });

                $scope.$watch('tableParams', function(params) {
                    $scope.loading = true;

                    var param = params.url();
                    param.category_id = $scope.category.id;
                    param.truncate = 500;
                    PagesResource.get(param, function(data) {
                        $log.info('Pages: ', data);

                        $scope.loading = false;

                        $scope.pagesList = data.data;

                        $scope.tableParams.total = data.pager.total;
                    });
                }, true);
            }]);

});
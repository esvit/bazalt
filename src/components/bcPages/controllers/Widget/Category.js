define('components/bcPages/controllers/Widget/Category', [
    'components/bcPages/app'
], function(app) {
    'use strict';

    app.controller('bcPages.Controllers.Widget.Category',
        ['$scope', 'widget', 'ngTableParams', 'bcPages.Factories.Page',
        function($scope, widget, ngTableParams, PagesResource) {

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

                var param = widget.$settings;
                param.truncate = 500;
                PagesResource.get(param, function(data) {
                    $scope.loading = false;

                    $scope.pagesList = data.data;

                    $scope.tableParams.total = data.pager.total;
                });
            }, true);
        }]);
});
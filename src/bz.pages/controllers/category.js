define([
    'bz.pages/app',

    'bz.pages/factories/category'
], function(app) {
    'use strict';

    app.controller('bz.pages.controllers.category',
        ['$scope', 'bz.pages.factories.page', 'ngTableParams', '$log',
            'category', // resolves
            'pageParams',
            function($scope, PageFactory, ngTableParams, $log, category, pageParams) {
                $log.debug('Controller "bz.pages.controllers.category": ', category, pageParams);
            $scope.category = category;
            pageParams = pageParams || {};

            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                total: 0,           // length of data
                count: 10,          // count per page
                sorting: {
                    name: 'asc'     // initial sorting
                }
            }, {
                counts: [],
                getData: function($defer, params) {
                    $scope.loading = true;

                    var param = params.url();
                    param.category_id = $scope.category.id;
                    param = angular.extend(param, pageParams);
                    PageFactory.get(param, function(data) {
                        $log.debug('Load pages: ', data);

                        $scope.loading = false;

                        $scope.tableParams.total(data.pager.total);
                        $defer.resolve($scope.pages = data.data);
                    });
                }
            });
        }]);

});
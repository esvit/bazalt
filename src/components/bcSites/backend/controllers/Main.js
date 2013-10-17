define('components/bcSites/backend/controllers/Main', [
    'components/bcSites/app'
], function (app) {
    'use strict';

    app.controller('bcSites.Controllers.Main',
        ['$scope', '$routeSegment', 'bcSites.Factories.Site', 'ngTableParams', '$filter', '$q',
            function ($scope, $routeSegment, SiteResource, ngTableParams, $filter, $q) {
                $scope.$routeSegment = $routeSegment;


                $scope.tableOptions = new ngTableParams({
                    page: 1,            // show first page
                    total: 0,           // length of data
                    count: 10,          // count per page
                    sorting: {
                        created_at: 'desc'     // initial sorting
                    }
                }, {
                    getData: function($defer, params) {
                        $scope.loading = true;

                        var param = params.url();
                        param.admin = true;
                        // ajax request to api
                        SiteResource.get(param, function(data) {
                            $scope.loading = false;
                            // set new data
                            $defer.resolve(data.data);

                            // update table params
                            params.total(data.total);
                        });
                    }
                });

                $scope.toggleActive = function(item) {
                    $scope.loading = true;
                    item.is_active = item.is_active;
                    var updatedObj = new SiteResource(item);
                    updatedObj.$save(function() {
                        $scope.loading = false;
                    });
                };

                $scope.remove = function(item) {
                    $scope.loading = true;

                    var page = new SiteResource(item);
                    page.$delete(function() {
                        angular.forEach($scope.items, function(i, n){
                            if (i == item) {
                                $scope.items.splice(n, 1);
                            }
                        });
                        $scope.loading = false;
                    });
                };
            }]);

});
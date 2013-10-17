define('components/bcPages/backend/controllers/Main', [
    'components/bcPages/app',

    'components/bcPages/backend/controllers/CategoryTree'
], function (app) {
    'use strict';

    app.controller('bcPages.Controllers.Main',
        ['$scope', '$routeSegment', 'bcPages.Factories.Page', 'ngTableParams', '$filter', '$q', 'bcUsers.Factories.User',
            function ($scope, $routeSegment, PageResource, ngTableParams, $filter, $q, UserResource) {
                $scope.$routeSegment = $routeSegment;

                $scope.tableOptions = new ngTableParams({
                    page: 1,            // show first page
                    total: 0,           // length of data
                    count: 10,          // count per page
                    sorting: {
                        created_at: 'desc'     // initial sorting
                    }
                }, {
                    groupBy: function(item) {
                        return $filter('date')(item.created_at, 'yyyy-MM-dd');
                    },
                    getData: function($defer, params) {
                        $scope.loading = true;

                        var param = params.url();
                        param.admin = true;
                        // ajax request to api
                        PageResource.get(param, function(data) {
                            $scope.loading = false;
                            // set new data
                            $defer.resolve($scope.items = data.data);

                            // update table params
                            params.total(data.total);
                        });
                    }
                });

                $scope.filterByCategory = function(category) {
                    $scope.category_id = (category) ? category.id : null;
                    $scope.tableOptions.parameters({'category_id': $scope.category_id});
                };

                $scope.togglePublished = function(item) {
                    $scope.loading = true;
                    item.is_published = item.is_published;
                    var updatedObj = new PageResource(item);
                    updatedObj.$save(function() {
                        $scope.loading = false;
                    });
                };

                $scope.users = function($column) {
                    var defer = $q.defer();

                    UserResource.get({'fields': 'id,fullname'}, function(res) {
                        var data = [];
                        angular.forEach(res.data, function(item) {
                            data.push({
                                id: item.id,
                                title: item.fullname
                            });
                        });
                        defer.resolve(data);
                    })

                    return defer;
                };

                $scope.remove = function(item) {
                    $scope.loading = true;

                    var page = new PageResource(item);
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
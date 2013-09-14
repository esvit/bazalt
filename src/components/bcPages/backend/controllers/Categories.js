define('components/bcPages/backend/controllers/Categories', [
    'components/bcPages/backend/app'
], function (module) {

    module.controller('bcPages.Controllers.Categories',
        ['$scope', '$rootScope', '$filter', '$routeSegment', 'bcPages.Factories.Category',
            function ($scope, $rootScope, $filter, $routeSegment, CategoriesResource) {

                CategoriesResource.getTree(function (res) {
                    var parents = [];
                    // get categories
                    $scope.category = res;

                        // select active category
                    $scope.activeCategory = CategoriesResource.find(res, function (item) {
                        return item.id == $routeSegment.$routeParams.category_id;
                    }, parents);

                    // open all nodes to active category
                    if ($scope.activeCategory) {
                        angular.forEach(parents, function (node) {
                            node.$expanded = true;
                        });
                    }
                });


                $scope.addCategory = function (child) {
                    child.$insertItem(function (item) {
                        item.focus = true;
                        item.$settings = true;
                    });
                };

                $scope.move = function (item, before, index) {
                    item.$moveItem(before, index);
                };

                $scope.saveCategory = function (item) {
                    var category = new CategoriesResource(item);
                    item.$loading = true;
                    if (!category.url) {
                        category.url = $filter('slug')(category.title.en);
                    }
                    category.$save(function (data) {
                        item.$loading = false;
                        item.url = data.url;
                    });
                };


                $scope.remove = function (child) {
                    function walk(target) {
                        var children = target.children,
                            i;
                        if (children) {
                            i = children.length;
                            while (i--) {
                                if (children[i].id == child.id) {
                                    return children.splice(i, 1);
                                } else {
                                    walk(children[i]);
                                }
                            }
                        }
                    }

                    $scope.loading = true;
                    CategoriesResource.delete({ 'id': child.id }, function () {
                        $scope.loading = false;
                        walk($scope.category);
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    });
                };
            }]);

});
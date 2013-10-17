define('components/bcPages/backend/controllers/CategoryTree', [
    'components/bcPages/backend/app', 'angular'
], function (app, angular) {

    app.controller('bcPages.Controllers.CategoryTree',
        ['$scope', 'bcPages.Factories.Category', '$routeParams',
            function ($scope, CategoriesResource, $routeParams) {

                // get categories
                $scope.category = CategoriesResource.getTree(function (res) {
                    var parents = [];

                    // select active category
                    $scope.activeCategory = CategoriesResource.find(res, function (item) {
                        return item.id == $routeParams.category_id;
                    }, parents);

                    // open all nodes to active category
                    if ($scope.activeCategory) {
                        angular.forEach(parents, function (node) {
                            node.$expanded = true;
                        });
                    }
                });
            }]);

});
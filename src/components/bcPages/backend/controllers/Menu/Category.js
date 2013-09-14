define('components/bcPages/backend/controllers/Menu/Category', [
    'components/bcPages/backend/app'
], function (app) {

    app.controller('bcPages.Controllers.Menu.Category',
        ['$scope', 'bcPages.Factories.Category', '$filter', function ($scope, CategoriesResource, $filter) {

            var language = $filter('language');
            if ($scope.child.settings.category_id) {
                var category = new CategoriesResource({ 'id': $scope.child.settings.category_id });
                category.$get(function (data) {
                    $scope.category = data;
                });
            }
            $scope.$watch('category', function (value) {
                if (value) {
                    $scope.child.settings.category_id = value.id;
                }
            });
            $scope.selectorConfig = {
                formatResult: function (item) {
                    if (!item.id) return '<strong>' + language(item.title) + '</strong>';
                    return language(item.title);
                },
                formatSelection: function (item) {
                    return language(item.title);
                },
                query: function (query) {
                    CategoriesResource.get({ 'q': query.term }, function (result) {
                        query.callback({ results: result.data });
                    });
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                }
            };
        }]);

});
define('components/bcPages/backend/controllers/Menu/Page', [
    'components/bcPages/backend/app'
], function(module) {

    module.controller('bcPages.Controllers.Menu.Page',
        ['$scope', 'bcPages.Factories.Page', function($scope, PagesResource) {

            if ($scope.child.settings.page_id) {
                var page = new PagesResource({ 'id': $scope.child.settings.page_id });
                page.$get(function(data) {
                    $scope.page = data;
                });
            }
            $scope.$watch('page', function(value) {
                if (value) {
                    $scope.child.settings.page_id = value.id;
                }
            });
            $scope.selectorConfig = {
                formatResult: function(item) {
                    if (!item.id) {
                        return '<strong>' + item.title.en + '</strong>';
                    }
                    return item.title.en;
                },
                formatSelection: function(item) {
                    return item.title.en;
                },
                query: function (query) {
                    PagesResource.get({ 'q': query.term }, function(result) {
                        query.callback({ results: result.data });
                    });
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                }
            };
        }]);

});
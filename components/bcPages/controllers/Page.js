define('components/bcPages/controllers/Page', [
    'components/bcPages/app'
], function(app) {
    'use strict';

    app.controller('bcPages.Controllers.Page', ['$scope', '$routeSegment', 'bzConfig', 'bcPages.Factories.Page',
        function($scope, $routeSegment, bzConfig, PagesResource) {

            if ($routeSegment.$routeParams.pageAlias) {
                PagesResource.get({ 'alias': $routeSegment.$routeParams.pageAlias }, function (page) {
                    page.template = bzConfig.templateUrl('/views/pages/' + page.template);
                    PagesResource.hit({'id': page.id});
                    $scope.page = page;
                }, function () {
                });
            }
            if ($routeSegment.$routeParams.id) {
                PagesResource.get({ 'id': $routeSegment.$routeParams.id }, function (page) {
                    page.template = bzConfig.templateUrl('/views/pages/' + page.template);
                    PagesResource.hit({'id': page.id});
                    $scope.page = page;
                }, function () {
                });
            }
    }]);
});
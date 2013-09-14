define('components/bcPages/controllers/Page', [
    'components/bcPages/app'
], function(app) {
    'use strict';

    app.controller('bcPages.Controllers.Page', ['$scope', '$routeSegment', 'bzConfig', 'bcPages.Factories.Page',
        function($scope, $routeSegment, bzConfig, PagesResource) {

        PagesResource.get({ 'alias': $routeSegment.$routeParams.pageAlias }, function (page) {
            page.template = bzConfig.templateUrl('/views/pages/' + page.template);
            PagesResource.hit({'id': page.id});
            $scope.page = page;
        }, function () {
        });
    }]);
});
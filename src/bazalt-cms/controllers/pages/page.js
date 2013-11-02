define([
    'bazalt-cms/app', 'bazalt-cms/providers/bzConfig'
], function(app) {
    'use strict';

    app.controller('bazalt.controllers.pages.page',
        ['$scope', '$routeSegment', 'bzConfig', 'bazalt.pages.page',
        function($scope, $routeSegment, bzConfig, PagesResource) {
            $scope.loading = true;

            if ($routeSegment.$routeParams.pageAlias) {
                PagesResource.get({ 'alias': $routeSegment.$routeParams.pageAlias }, function (page) {
                    $scope.loading = false;

                    PagesResource.hit({'id': page.id}); // track view

                    $scope.page = page;
                }, function (res) {
                    $scope.loading = false;

                    $scope.page = { template: '/views/pages/404.html' };
                });
            }
            if ($routeSegment.$routeParams.id) {
                PagesResource.get({ 'id': $routeSegment.$routeParams.id }, function (page) {
                    $scope.loading = false;

                    PagesResource.hit({'id': page.id}); // track view

                    $scope.page = page;
                }, function () {
                    $scope.loading = false;

                    $scope.page = { template: '/views/pages/404.html' };
                });
            }
        }]);

});
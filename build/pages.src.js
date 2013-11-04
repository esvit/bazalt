(function () {
define('bz.pages/app',[
    'angular', 'bz'
], function(angular) {
    'use strict';

    return angular.module('bz.pages', ['bz']);
});
define('bz.pages/factories/page',[
    'bz.pages/app'
], function(app) {
    'use strict';

    app.factory('bz.pages.factories.page', ['$resource', 'bzConfig', function ($resource, config) {
        var service = $resource(config.resource('/pages/:id'), { 'id': '@id' }, {
            'hit': { 'method': 'PUT', 'params': { 'action': 'view' } } // increase view counter
        });

        return service;
    }]);

});
define('bz.pages/controllers/page',[
    'bz.pages/app',

    'bz.pages/factories/page'
], function(app) {
    'use strict';

    app.controller('bz.pages.controllers.page',
        ['$scope', '$routeSegment', 'bzConfig', 'bz.pages.factories.page',
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
define('bz/pages',[
    'bz.pages/app',

    'bz.pages/controllers/page'
], function(app) {

    //app.config([function() {}]);

    //app.run([function() {}]);

    return app;
});}());
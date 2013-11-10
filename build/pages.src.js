(function () {
define('bz.pages/app',[
    'angular', 'bz', 'ngTable', 'ng-editable-tree'
], function(angular) {
    'use strict';

    return angular.module('bz.pages', ['bz', 'ngTable', 'ngEditableTree']);
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
        ['$scope', 'page', 'bz.pages.factories.page', function($scope, page, PageFactory) {
            $scope.page = page;
            PageFactory.hit({ 'id': page.id });
        }]);

});
define('bz.pages/factories/category',[
    'bz.pages/app'
], function(app) {
    'use strict';

    app.factory('bz.pages.factories.category', ['ngNestedResource', 'bzConfig', function (ngNestedResource, config) {
        var service = ngNestedResource(config.resource('/pages/categories/:id'), { 'id': '@id' }, {});

        return service;
    }]);

});
define('bz.pages/controllers/category',[
    'bz.pages/app',

    'bz.pages/factories/category'
], function(app) {
    'use strict';

    app.controller('bz.pages.controllers.category',
        ['$scope', 'bz.pages.factories.page', 'ngTableParams', '$log',
            'category', // resolves
            'pageParams',
            function($scope, PageFactory, ngTableParams, $log, category, pageParams) {
                $log.debug('Controller "bz.pages.controllers.category": ', category, pageParams);
            $scope.category = category;
            pageParams = pageParams || {};

            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                total: 0,           // length of data
                count: 10,          // count per page
                sorting: {
                    name: 'asc'     // initial sorting
                }
            }, {
                counts: [],
                getData: function($defer, params) {
                    $scope.loading = true;

                    var param = params.url();
                    param.category_id = $scope.category.id;
                    PageFactory.get(param, function(data) {
                        $log.debug('Load pages: ', data);

                        $scope.loading = false;

                        $scope.tableParams.total(data.pager.total);
                        $defer.resolve($scope.pages = data.data);
                    });
                }
            });
        }]);

});
define('bz/pages',[
    'bz.pages/app',

    'bz.pages/controllers/page',
    'bz.pages/controllers/category'
], function(app) {

    //app.config([function() {}]);

    //app.run([function() {}]);

    return app;
});}());
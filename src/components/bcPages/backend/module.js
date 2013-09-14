define('components/bcPages/backend/module', [
    'components/bcPages/backend/app',

    'components/bcPages/factories/Page',
    'components/bcPages/factories/Category',
    'components/bcPages/factories/Tag',

    'components/bcPages/backend/controllers/Main',
    'components/bcPages/backend/controllers/PageEdit',
    'components/bcPages/backend/controllers/Categories',
    'components/bcPages/backend/controllers/Menu/Page',
    'components/bcPages/backend/controllers/Menu/Category'
], function(app) {
    'use strict';

    app.config(['$routeSegmentProvider',
        function ($routeSegmentProvider) {

        $routeSegmentProvider
            .when('/pages', 'pages')
            .when('/pages/categories', 'pagesCategories')
            .when('/pages/new', 'pagesNew')
            .when('/pages/:id', 'pagesEdit');

        $routeSegmentProvider
            .segment('pages', {
                templateUrl: '/src/components/bcPages/backend/views/list.html',
                controller: 'bcPages.Controllers.Main'
            })
            .segment('pagesNew', {
                templateUrl: '/src/components/bcPages/backend/views/edit.html',
                controller: 'bcPages.Controllers.PageEdit'
            })
            .segment('pagesEdit', {
                templateUrl: '/src/components/bcPages/backend/views/edit.html',
                dependencies: ['id'],
                controller: 'bcPages.Controllers.PageEdit'
            })
            .segment('pagesCategories', {
                templateUrl: '/src/components/bcPages/backend/views/categories.html',
                controller: 'bcPages.Controllers.Categories'
            });
    }]);
});
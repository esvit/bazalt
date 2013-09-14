define('components/bcMenu/backend/module', [
    'components/bcMenu/backend/app',

    'components/bcMenu/factories/Menu',
    'components/bcMenu/factories/Elements',

    'components/bcMenu/backend/controllers/Main',
    'components/bcMenu/backend/controllers/MenuEdit',
    'components/bcMenu/backend/controllers/MainSettings'
], function(app) {
    'use strict';

    app.config(['$routeSegmentProvider',
        function ($routeSegmentProvider) {

        $routeSegmentProvider
            .when('/menu', 'menu')
            .when('/menu/:id', 'menu.edit');

        $routeSegmentProvider
            .segment('menu', {
                templateUrl: '/src/components/bcMenu/backend/views/menu.html',
                controller: 'bcMenu.Controllers.Main'
            })
            .within()
            .segment('edit', {
                templateUrl: '/src/components/bcMenu/backend/views/edit.html',
                resolve: {
                    menu: ['$q', 'bcMenu.Factories.Menu', '$routeParams', function ($q, MenuResource, $routeParams) {
                        return MenuResource.get({ 'id': $routeParams.id }).$promise;
                    }]
                },
                dependencies: ['id'],
                controller: 'bcMenu.Controllers.MenuEdit'
            });
    }]);

});
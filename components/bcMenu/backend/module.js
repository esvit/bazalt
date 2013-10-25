define('components/bcMenu/backend/module', [
    'components/bcMenu/backend/app',

    'components/bcMenu/factories/Menu',
    'components/bcMenu/factories/Elements',

    'components/bcMenu/backend/controllers/Main',
    'components/bcMenu/backend/controllers/MenuEdit',
    'components/bcMenu/backend/controllers/MainSettings'
], function(app) {
    'use strict';

    app.config(['$routeSegmentProvider', 'bzConfigProvider',
        function ($routeSegmentProvider, bzConfig) {

        $routeSegmentProvider
            .when('/menu', 'menu')
            .when('/menu/:id', 'menu.edit');

        $routeSegmentProvider
            .segment('menu', {
                templateUrl: bzConfig.templateUrl('/components/bcMenu/backend/views/menu.html'),
                controller: 'bcMenu.Controllers.Main'
            })
            .within()
            .segment('edit', {
                templateUrl: bzConfig.templateUrl('/components/bcMenu/backend/views/edit.html'),
                dependencies: ['id'],
                controller: 'bcMenu.Controllers.MenuEdit'
            });
    }]);

});
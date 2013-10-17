define('components/bcMenu/app', [
    'angular', 'angular-resource', 'ngTable', '../.',

    'modules/bzConfig/module',
    'modules/bzMenu/module',
    'modules/bzWidgets/module'
], function(angular) {
    'use strict';

    var app = angular.module('Components.bcMenu', ['ngResource', 'ngEditableTree', 'bzMenu', 'bzConfig', 'bzWidgets']);

    app.run(['bzMenu.Types', function(menuTypes) {

        menuTypes.push({
            id: 'bcMenu.Menu.MainPage',
            title: 'Главная страница',
            component: 'Меню',
            templateUrl: null
        });

        menuTypes.push({
            id: 'bcMenu.Menu.Link',
            title: 'Ссылка',
            component: 'Меню',
            templateUrl: '/src/components/bcMenu/backend/views/menu/link.html'
        });

    }]);

    return app;
});
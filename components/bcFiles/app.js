define('components/bcFiles/app', [
    'angular', 'angular-resource'
], function(angular) {
    'use strict';

    var app = angular.module('Components.bcFiles', ['ngResource']);

    /*app.run(['bcFiles.Types', function(menuTypes) {

        menuTypes.push({
            id: 'bcFiles.Menu.MainPage',
            title: 'Главная страница',
            component: 'Меню',
            templateUrl: null
        });

        menuTypes.push({
            id: 'bcFiles.Menu.Link',
            title: 'Ссылка',
            component: 'Меню',
            templateUrl: '/components/bcMenu/backend/views/menu/link.html'
        });

    }]);*/

    return app;
});
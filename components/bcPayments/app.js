define('components/bcPayments/app', [
    'angular', 'angular-resource', 'angular-route', 'ngTable',

    'modules/bzWidgets/module'
], function(angular) {
    'use strict';

    var app = angular.module('Components.bcPayments', ['ngResource', 'ngRoute', 'ngTable', 'bzWidgets']);

  /*  app.run(['bzMenu.Types', function(menuTypes) {

        menuTypes.push({
            id: 'bcPayments.Menu.Page',
            title: 'Ссылка на страницу',
            component: 'Страницы',
            templateUrl: '/bazalt/src/components/bcPayments/backend/views/menu/page.html'
        });

        menuTypes.push({
            id: 'bcPayments.Menu.Category',
            title: 'Ссылка на категорию',
            component: 'Страницы',
            templateUrl: '/bazalt/src/components/bcPayments/backend/views/menu/category.html'
        });

    }]);*/

    return app;
});
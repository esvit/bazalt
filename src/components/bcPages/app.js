define('components/bcPages/app', [
    'angular', 'angular-resource', 'angular-route', 'ng-ckeditor', 'ngTable',

    'modules/bzUploader/module',
    'modules/bzWidgets/module'
], function(angular) {
    'use strict';

    var app = angular.module('Components.bcPages', ['ngResource', 'ngRoute', 'ngTable', 'bzWidgets', 'bzUploader', 'ngCkeditor']);

    app.run(['bzMenu.Types', function(menuTypes) {

        menuTypes.push({
            id: 'bcPages.Menu.Page',
            title: 'Ссылка на страницу',
            component: 'Страницы',
            templateUrl: '/bazalt/src/components/bcPages/backend/views/menu/page.html'
        });

        menuTypes.push({
            id: 'bcPages.Menu.Category',
            title: 'Ссылка на категорию',
            component: 'Страницы',
            templateUrl: '/bazalt/src/components/bcPages/backend/views/menu/category.html'
        });

    }]);

    return app;
});
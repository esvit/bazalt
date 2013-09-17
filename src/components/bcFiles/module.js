define('components/bcFiles/module', [
    'components/bcFiles/app',

    'components/bcFiles/factories/Menu'
], function(app) {
    'use strict';

    /*app.config(['bzThemeProvider', 'bzWidgetsProvider',
        function (bzThemeProvider, bzWidgetsProvider) {

        bzWidgetsProvider.add({
            id: 'bcMenu.Widgets.Menu',
            title: 'Виджет меню',
            component: 'Меню',
            templateUrl: bzThemeProvider.templateUrl('/views/widgets/menu/menu.html'),
            resolve: {
                menu: ['$q', 'bcMenu.Factories.Elements', 'bzWidget', function($q, MenuResource, widget) {
                    var deferred = $q.defer();

                    var item = new MenuResource(widget.$settings);
                    item.$get(function() {
                        deferred.resolve(item);
                    }, function() {
                        deferred.reject($q.reject({}));
                    });
                    return deferred.promise;
                }]
            }
        });

    }]);*/

});
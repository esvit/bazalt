define('components/bcMenu/module', [
    'components/bcMenu/app',

    'components/bcMenu/controllers/MenuItem',

    'components/bcMenu/factories/Menu'
], function(app) {
    'use strict';

    app.config(['bzConfigProvider', 'bzWidgetsProvider',
        function (bzConfigProvider, bzWidgetsProvider) {

        bzWidgetsProvider.add({
            id: 'bcMenu.Widgets.Menu',
            title: 'Виджет меню',
            component: 'Меню',
            templateUrl: bzConfigProvider.templateUrl('/views/widgets/menu/menu.html'),
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

    }]);

});
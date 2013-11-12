define([
    'bz.widgets/app',

    'bz.widgets/directives/widget',
    'bz.widgets/providers/bzWidget',
    'bz.widgets/providers/bzWidgets'
], function(app) {

    app.config(['bzConfigProvider', 'bzWidgetsProvider',
        function (bzConfigProvider, bzWidgetsProvider) {

            bzWidgetsProvider.add({
                id: 'bcMenu.Widgets.Menu',
                title: 'Виджет меню',
                component: 'Меню',
                templateUrl: bzConfigProvider.templateUrl('/views/widgets/menu/default.html'),
                resolve: {
                    menu: ['$q', 'bz.menu.factories.element', 'bzWidget', function($q, ElementFactory, widget) {
                        var deferred = $q.defer();

                        var item = new ElementFactory(widget.$settings);
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

    //app.run([function() {}]);

    return app;
});
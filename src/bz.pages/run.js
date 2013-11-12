define([
    'bz.pages/app',

    'bz.pages/controllers/page',
    'bz.pages/controllers/category',
    'bz.pages/controllers/widgets/category'
], function (app) {

    //app.config([function() {}]);

    //app.run([function() {}]);

    app.config(['bzConfigProvider', 'bzWidgetsProvider',
        function (bzConfigProvider, bzWidgetsProvider) {

            bzWidgetsProvider.add({
                id: 'bcPages.Widgets.Page',
                title: 'Виджет страница',
                component: 'Страницы',
                templateUrl: bzConfigProvider.templateUrl('/views/widgets/pages/page.html'),
                resolve: {
                    page: ['$q', 'bz.pages.factories.page', 'bzWidget', function ($q, PageResource, widget) {
                        var deferred = $q.defer();

                        PageResource.get({ 'id': widget.$settings.id }, function (page) {
                            page.template = bzConfigProvider.templateUrl('/views/pages/default.html');
                            deferred.resolve(page);
                        }, function () {
                            deferred.reject($q.reject({}));
                        });

                        return deferred.promise;
                    }]
                }
            });
            bzWidgetsProvider.add({
                id: 'bcPages.Widgets.Category',
                title: 'Виджет категория страниц',
                component: 'Страницы',
                templateUrl: bzConfigProvider.templateUrl('/views/widgets/pages/category.html'),
                controller: 'bz.pages.controllers.widget.category'
            });
        }]);


    return app;
});
define('components/bcPayments/module', [
    'components/bcPayments/app',

    'components/bcPayments/factories/Transaction'
], function (app) {
    'use strict';

    app.config(['$routeProvider', '$routeSegmentProvider', 'bzConfigProvider', 'bzWidgetsProvider',
        function ($routeProvider, $routeSegmentProvider, bzConfigProvider, bzWidgetsProvider) {

           /* bzWidgetsProvider.add({
                id: 'bcPayments.Widgets.Page',
                title: 'Виджет страница',
                component: 'Страницы',
                templateUrl: bzConfigProvider.templateUrl('/views/widgets/pages/page.html'),
                resolve: {
                    page: ['$q', 'bcPayments.Factories.Page', 'bzWidget', function ($q, PageResource, widget) {
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
                id: 'bcPayments.Widgets.Category',
                title: 'Виджет категория страниц',
                component: 'Страницы',
                templateUrl: bzConfigProvider.templateUrl('/views/widgets/pages/category.html'),
                controller: 'bcPayments.Controllers.Widget.Category'
            });*/

            $routeSegmentProvider
                .when('/user/:user_id/payments/:id', 'profile.transaction');

            $routeSegmentProvider
                .within('profile')
                .segment('transaction', {
                    templateUrl: '/views/user/payments/transaction.html'
                    //controller: 'bcPayments.Controllers.Page'
                });
        }]);

});
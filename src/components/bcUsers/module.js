define('components/bcUsers/module', [
    'components/bcUsers/app',

    'components/bcUsers/controllers/Lady'
], function (app) {
    'use strict';

    app.config(['$routeSegmentProvider', 'bzConfigProvider', 'bzWidgetsProvider',
        function ($routeSegmentProvider, bzConfigProvider, bzWidgetsProvider) {

            /*bzWidgetsProvider.add({
                id: 'bcPages.Widgets.Page',
                title: 'Виджет страница',
                component: 'Страницы',
                templateUrl: bzConfigProvider.templateUrl('/views/widgets/pages/page.html'),
                resolve: {
                    page: ['$q', 'bcPages.Factories.Page', '$widgetSettings', function ($q, PageResource, $widgetSettings) {
                        var deferred = $q.defer();

                        PageResource.get({ 'id': $widgetSettings.id }, function (page) {
                            page.template = bzConfigProvider.templateUrl('/views/pages/default.html');
                            deferred.resolve(page);
                        }, function () {
                            deferred.reject($q.reject({}));
                        });

                        return deferred.promise;
                    }]
                }
            });*/

            $routeSegmentProvider
                .when('/user', 'main.profile')
                .when('/user/registration', 'main.registration')
                .when('/user/profiles', 'main.profiles')
                .when('/user/profile', 'main.profile');

            $routeSegmentProvider
                /*.segment('user', {
                    templateUrl: bzConfigProvider.templateUrl('/views/layout.html')
                })*/
                .within('main')
                .segment('profile', {
                    templateUrl: bzConfigProvider.templateUrl('/views/user/profile.html'),
                    controller: function ($scope) {
                        $scope.$watch('user', function(value){
                            console.info(value);
                        });
                    }
                })
                .up()
                .within()
                .segment('registration', {
                    templateUrl: bzConfigProvider.templateUrl('/views/user/account/registerForm.html'),
                    //controller: 'bcPages.Controllers.Category'
                })
                .up()
                .within()
                .segment('profile', {
                    templateUrl: bzConfigProvider.templateUrl('/views/user/profile.html'),
                    //controller: 'bcPages.Controllers.Category'
                })
                .up()
                .within()
                .segment('profiles', {
                    templateUrl: bzConfigProvider.templateUrl('/views/user/lady.html'),
                    controller: 'bcUsers.Controllers.Lady'
                });
        }]);

});
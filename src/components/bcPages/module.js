define('components/bcPages/module', [
    'components/bcPages/app',

    'components/bcPages/controllers/Page',
    'components/bcPages/controllers/Category',
    'components/bcPages/controllers/Widget/Category',
    'components/bcPages/controllers/AddPost',

    'components/bcPages/factories/Page',
    'components/bcPages/factories/Category',
    'components/bcPages/factories/Tag',
    'components/bcPages/factories/PageRating'
], function (app) {
    'use strict';

    app.config(['$routeProvider', '$routeSegmentProvider', 'bzConfigProvider', 'bzWidgetsProvider',
        function ($routeProvider, $routeSegmentProvider, bzConfigProvider, bzWidgetsProvider) {

            bzWidgetsProvider.add({
                id: 'bcPages.Widgets.Page',
                title: 'Виджет страница',
                component: 'Страницы',
                templateUrl: bzConfigProvider.templateUrl('/views/widgets/pages/page.html'),
                resolve: {
                    page: ['$q', 'bcPages.Factories.Page', 'bzWidget', function ($q, PageResource, widget) {
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
                controller: 'bcPages.Controllers.Widget.Category'
            });

            $routeSegmentProvider
                .when('/', 'home')
                .when('/c-:categoryAlias', 'category')
                .when('/p-:pageAlias', 'page')
                .when('/user/add-post', 'profile.add-post');

            $routeSegmentProvider
                .segment('home', {
                    templateUrl: bzConfigProvider.templateUrl('/views/index.html'),
                    controller: function () {}
                })
                .segment('category', {
                    template: '<div ng-include="category.template()"></div>',
                    resolve: {
                        category: ['$q', '$route', 'bcPages.Factories.Category',
                            function ($q, $route, CategoryResource) {
                                var deferred = $q.defer();

                                CategoryResource.get({ 'alias': $route.current.params.categoryAlias }, function (page) {
                                    page.template = bzConfigProvider.templateUrl('/views/pages/category.html');
                                    deferred.resolve(page);
                                }, function () {
                                    deferred.reject($q.reject({}));
                                });

                                return deferred.promise;
                            }]
                    },
                    dependencies: ['categoryAlias'],
                    controller: 'bcPages.Controllers.Category'
                })
                .segment('page', {
                    template: '<div ng-include="page.template()"></div>',
                    dependencies: ['pageAlias'],
                    controller: 'bcPages.Controllers.Page'
                })
                .within('profile')
                    .segment('add-post', {
                        templateUrl: bzConfigProvider.templateUrl('/views/user/profile/add-post.html'),
                        controller: 'bcPages.Controllers.AddPost'
                    });

            /*
             $routeProvider
             .when('/', {
             templateUrl: bzConfigProvider.templateUrl('/views/index.html'),
             controller: function() {}
             })
             .when('/page/:pageAlias', {
             template: '<div ng-include="page.template()"></div>',
             resolve: {
             page: ['$q', '$route', 'bcPages.Factories.Page', function ($q, $route, PagesResource) {
             var deferred = $q.defer();

             PagesResource.get({ 'alias': $route.current.params.pageAlias }, function(page) {
             page.template = bzConfigProvider.templateUrl('/views/pages/default.html');
             deferred.resolve(page);
             }, function() {
             deferred.reject($q.reject({}));
             });

             return deferred.promise;
             }]
             },
             controller: 'bcPages.Controllers.Page'
             })
             .when('/:categoryAlias', {
             template: '<div ng-include="category.template()"></div>',
             resolve: {
             category: ['$q', '$route', 'bcPages.Factories.Category',
             function ($q, $route, CategoryResource) {
             var deferred = $q.defer();

             CategoryResource.get({ 'alias': $route.current.params.categoryAlias }, function(page) {
             page.template =  bzConfigProvider.templateUrl('/views/pages/category.html');
             deferred.resolve(page);
             }, function() {
             deferred.reject($q.reject({}));
             });

             return deferred.promise;
             }]
             },
             controller: 'bcPages.Controllers.Category'
             });
             */
        }]);

});
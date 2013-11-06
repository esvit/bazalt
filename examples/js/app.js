require(['angular', 'bz', 'bz/pages', 'bz/seo', 'angular-locale'], function(angular) {

    var app = angular.module('app', ['bz', 'bz.pages', 'bz.seo']);

    app.config(['$routeSegmentProvider', '$locationProvider', 'bzConfigProvider', '$logProvider', 'bzUserProvider', '$httpProvider',
        function($routeSegmentProvider, $locationProvider, config, $logProvider, bzUser, $httpProvider) {
        $locationProvider
            .html5Mode(false)
            .hashPrefix('!');

        // for apiari
        //$httpProvider.defaults.withCredentials = false;

        // если включено, то при старте приложения будет грузить данные про текущею сессию
        config.checkSessionOnStart(true);

        //$logProvider.debugEnabled(false);

        $routeSegmentProvider
            .when('/', 'home')
            .segment('home', {
                template: 'Home',
                resolve: {
                    permissions: bzUser.access()
                },
                resolveFailed: config.errorResolver()
            })
            .when('/post-:id', 'pageById')
            .segment('pageById', {
                template: '{{page.title|language}}',
                dependencies: ['id'],
                controller: 'bz.pages.controllers.page',
                resolve: {
                    permissions: bzUser.access(['admin.access']),
                    page: ['bz.pages.factories.page', '$q', '$routeParams', function(PageFactory, $q, $routeParams) {
                        var defer = $q.defer();
                        PageFactory.get({ id: $routeParams.id }, defer.resolve, defer.reject);
                        return defer.promise;
                    }]
                },
                resolveFailed: config.errorResolver()
            });
    }]);

    app.run(['$rootScope', '$location', 'bzUser', function($rootScope, $location, $user) {
        //console.info($user.has('admin.access'))
    }]);

    app.controller('test', ['$scope', 'bzUser', function($scope, $user) {
        $scope.login = function(user) {
            $user.$login(user);
        }
    }]);

    angular.bootstrap(document.documentElement, [app.name]);

    return app;
});
require(['angular', 'bz', 'bz/pages', 'angular-locale'], function(angular) {

    var app = angular.module('app', ['bz', 'bz.pages']);

    app.config(['$routeSegmentProvider', '$locationProvider', 'bzConfigProvider', '$logProvider', 'bzUserProvider',
        function($routeSegmentProvider, $locationProvider, config, $logProvider, bzUser) {
        $locationProvider
            .html5Mode(false)
            .hashPrefix('!');

        // если включено, то при старте приложения будет грузить данные про текущею сессию
        config.checkSessionOnStart(true);

        //$logProvider.debugEnabled(false);
        var error = {
            template: 'Error {{error}}',
            controller: function($scope, error) {
                $scope.error = error;
            }
        };

        $routeSegmentProvider
            .when('/', 'home')
            .segment('home', {
                template: 'Home',
                resolve: bzUser.access(),
                resolveFailed: error
            })
            .when('/post-:id', 'pageById')
            .segment('pageById', {
                template: '{{page.title|language}}',
                dependencies: ['id'],
                controller: 'bz.pages.controllers.page',
                resolve: bzUser.access(['admin.access']),
                resolveFailed: error
            });
    }]);

    app.run(['$rootScope', '$location', 'bzUser', function($rootScope, $location, $user) {

    }]);

    app.controller('test', ['$scope', 'bzUser', function($scope, $user) {
        $scope.login = function(user) {
            $user.$login(user);
        }
    }]);

    angular.bootstrap(document.documentElement, [app.name]);

    return app;
});
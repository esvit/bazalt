require(['angular', 'bz', 'angular-locale'], function(angular) {

    var app = angular.module('app', ['bz']);

    app.config(['$routeSegmentProvider', '$locationProvider', 'bzConfigProvider', '$logProvider', 'bzUserProvider', '$httpProvider',
        function($routeSegmentProvider, $locationProvider, bzConfig, $logProvider, bzUser, $httpProvider) {
        $locationProvider
            .html5Mode(false)
            .hashPrefix('!');

        // for apiari
        $httpProvider.defaults.withCredentials = false;


        $routeSegmentProvider.options.autoLoadTemplates = true;

        // если включено, то при старте приложения будет грузить данные про текущею сессию
        bzConfig.checkSessionOnStart(true);

        //$logProvider.debugEnabled(false);

        $routeSegmentProvider
            .when('/', 'home')
            .segment('home', {
                template: 'Home',
                resolve: {
                    permissions: bzUser.access()
                },
                resolveFailed: bzConfig.errorResolver()
            })
            .when('/testpage', 'test')
            .segment('test', {
                templateUrl: 'views/testpage.html',
                dependencies: ['id'],
                controller: 'test',
                resolve: {
                    permissions: bzUser.access(['admin.access']),
                    page: ['$q', function($q) {
                        var defer = $q.defer();
                        defer.resolve('Hello, world!');
                        return defer.promise;
                    }]
                },
                resolveFailed: bzConfig.errorResolver()
            });
    }]);

    app.run(['$rootScope', '$location', 'bzUser', function($rootScope, $location, $user) {
        //console.info($user.has('admin.access'))
    }]);

    app.controller('test', ['$scope', 'bzUser', 'page', function($scope, $user, page) {
        $scope.page = page;
        
      $scope.image = {
        //'url': 'http://placehold.it/100x50',
        'thumbnails': {
            //'default': 'http://placehold.it/100x100',
            /*'small': 'http://placehold.it/200x200',
            'medium': 'http://placehold.it/400x400',
            'large': 'http://placehold.it/800x800'*/
        }
      };
    }]);

    app.controller('login', ['$scope', 'bzUser', function($scope, $user) {
        $scope.login = function(user) {
            $user.$login(user);
        }
    }]);

    angular.bootstrap(document.documentElement, [app.name]);

    return app;
});
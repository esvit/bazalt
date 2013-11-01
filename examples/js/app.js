require(['angular', 'bazalt-cms', 'http://code.angularjs.org/1.2.0-rc.3/i18n/angular-locale_uk-ua.js'], function(angular) {

    var app = angular.module('app', ['bazalt-cms']);

    app.config(['$routeSegmentProvider', '$locationProvider', 'bazalt.configProvider', '$logProvider',
        function($routeSegmentProvider, $locationProvider, config, $logProvider) {
        $locationProvider
            .html5Mode(false)
            .hashPrefix('!');

        //$logProvider.debugEnabled(false);

        $routeSegmentProvider
            .when('/post-:id', 'pageById')
            .segment('pageById', {
                template: '{{page.title|language}}',
                dependencies: ['id'],
                controller: 'bazalt.controllers.pages.page'
            });
    }]);

    app.run(['$rootScope', '$location', '$locale', function($rootScope, $location, $locale) {

    }]);

    angular.bootstrap(document.documentElement, [app.name]);

    return app;
});
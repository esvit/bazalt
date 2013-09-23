define('frontend/routes', [
    'frontend/app'
], function(app) {
    'use strict';

    app.config(['$routeProvider', '$routeSegmentProvider', '$locationProvider', '$sceProvider', 'bzConfigProvider', '$httpProvider',
        function ($routeProvider, $routeSegmentProvider, $locationProvider, $sceProvider, bzConfigProvider, $httpProvider) {
            $locationProvider
                .html5Mode(true)
                .hashPrefix('!');
            bzConfigProvider.mine($('body').data('mine')).templatePrefix('');

            $routeSegmentProvider.options.autoLoadTemplates = true;

            $sceProvider.enabled(false);

            $httpProvider.responseInterceptors.push('loaderInterceptor');
            var spinnerFunction = function (data) {
                return data;
            };
            $httpProvider.defaults.transformRequest.push(spinnerFunction);
        }])

        //register the interceptor as a service, intercepts ALL angular ajax http calls
        .factory('loaderInterceptor', ['$q', '$injector', '$rootScope', function ($q, $injector, $rootScope) {
            return function (promise) {
                var $http = $http || $injector.get('$http');
                $rootScope.polling = $http.pendingRequests.length === 0;
                return promise.then(function (response) {
                    $rootScope.polling = $http.pendingRequests.length !== 0;
                    return response;
                }, function (response) {
                    $rootScope.polling = $http.pendingRequests.length !== 0;
                    $rootScope.network_error = true;
                    return $q.reject(response);
                });
            };
        }]);
});
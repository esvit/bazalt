define([
    'angular',
    'bz/app',
    'bz/factories/bzInterceptorBuffer'
], function (angular, app) {
    'use strict';

    // catch unauthorizate requests
    return ['$rootScope', '$q', 'bzInterceptorBuffer',
        function ($rootScope, $q, httpBuffer) {

            $rootScope.$on('baUserLogin', function () {
                var updater = function (config) {
                    return config;
                };
                httpBuffer.retryAll(updater);
            });

            function success(response) {
                return response;
            }

            function error(response) {
                if (response.status === 403 && !response.config.ignoreAuthModule) {
                    var deferred = $q.defer();
                    httpBuffer.append(response.config, deferred);
                    $rootScope.$broadcast('$user:loginRequired');
                    return deferred.promise;
                }
                // otherwise, default behaviour
                return $q.reject(response);
            }

            return function (promise) {
                return promise.then(success, error);
            };

        }];

});
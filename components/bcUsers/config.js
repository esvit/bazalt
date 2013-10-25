define('components/bcUsers/config', [
    'components/bcUsers/app',

    'components/bcUsers/providers/$user',

    'components/bcUsers/factories/AuthorizationBuffer'
], function (app) {
    'use strict';

    app.config(['$httpProvider', '$userProvider', function ($httpProvider, $userProvider) {

        // catch unauthorizate requests
        var interceptor = ['$rootScope', '$q', 'bcUsers.Factories.AuthorizationBuffer',
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
        $httpProvider.responseInterceptors.push(interceptor);
    }]);
});
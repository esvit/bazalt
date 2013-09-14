define('modules/bzAuthorization/module', [
    'modules/bzAuthorization/app',

    'modules/bzAuthorization/factories/bzAuthorizationBuffer'
], function(app) {
    'use strict';

    app.config(['baConfigProvider', '$httpProvider',
        function(baConfigProvider, $httpProvider) {

            // @todo add on theme change functionality
            baConfigProvider
                .templateUrl('/views/user')
                .apiEndpoint('/api/rest.php/auth');
            // catch unauthorizate requests
            var interceptor = ['$rootScope', '$q', 'bzAuthorizationBuffer', function($rootScope, $q, httpBuffer) {

                $rootScope.$on('baUserLogin', function() {
                    var updater = function(config) { return config; };
                    httpBuffer.retryAll(updater);
                });

                function success(response) {
                    return response;
                }

                function error(response) {
                    if (response.status === 403 && !response.config.ignoreAuthModule) {
                        var deferred = $q.defer();
                        httpBuffer.append(response.config, deferred);
                        $rootScope.$broadcast('bzAuthorization:$loginRequired');
                        return deferred.promise;
                    }
                    // otherwise, default behaviour
                    return $q.reject(response);
                }

                return function(promise) {
                    return promise.then(success, error);
                };

            }];
            $httpProvider.responseInterceptors.push(interceptor);
        }]);

    app.directive('autoFillSync', function($timeout) {
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModel) {
                var origVal = elem.val();
                $timeout(function () {
                    var newVal = elem.val();
                    if(ngModel.$pristine && origVal !== newVal) {
                        ngModel.$setViewValue(newVal);
                    }
                }, 500);
            }
        }
    });
});
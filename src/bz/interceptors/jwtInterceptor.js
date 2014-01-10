define([
    'angular',
    'bz/app'
], function (angular, app) {
    'use strict';

    app.factory('jwtInterceptor', ['$rootScope', '$q', '$window', '$cookieStore', function ($rootScope, $q, $window, $cookieStore) {
        var setItem = ($window.sessionStorage) ? function (key, value) {
            $window.sessionStorage[key] = value;
        } : function (key, value) {
            $cookieStore.put(key, value);
        }, getItem = ($window.sessionStorage) ? function (key) {
            return $window.sessionStorage[key] || null;
        } : function(key) {
            return $cookieStore.get(key);
        };
        return {
            request: function (config) {
                var token = getItem('token');
                config.headers = config.headers || {};
                if (token != 'undefined' && angular.isDefined(token)) {
                    config.headers.Authorization = 'Bearer ' + token;
                }
                return config;
            },
            response: function (response) {
                if (response.status === 401) {
                    // handle the case where the user is not authenticated
                }
                return response || $q.when(response);
            },
            setToken: function(token) {
                setItem('token', token);
            }
        };
    }]);

    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('jwtInterceptor');
    }]);

});
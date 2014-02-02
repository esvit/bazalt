define([
    'angular', 'bz/app', 'bz/providers/bzConfig'
], function(angular, app) {
    'use strict';

    app.factory('bzSessionFactory', ['$resource', 'bzConfig', '$cookieStore', '$q', '$log', 'jwtInterceptor',
    function ($resource, config, $cookieStore, $q, $log, jwtInterceptor) {
        var sessionObject = $resource(config.resource('/auth/session'), {}, {
            'renew':    { method: 'PUT' },
            'changeRole':    { method: 'PUT', params: {'action': 'changeRole'} },
            '$login':    { method: 'POST' },
            '$logout':   { method: 'DELETE' }
        }), defer = $q.defer(),
            $session,
            guestData = { is_guest: true, permissions: ['guest'] };

        sessionObject.prototype.$login = function(data, callback, error) {
            sessionObject.$login(data, function(result) {
                $session.$set(result);
                callback = callback || angular.noop;
                callback($session);
            }, error);
        };
        sessionObject.prototype.$logout = function(callback, error) {
            sessionObject.$logout({}, function(data) {
                data = angular.copy(guestData);
                $session.$set(data);
                jwtInterceptor.setToken(undefined);
                callback = callback || angular.noop;
                callback($session);
            }, error);
        };
        sessionObject.prototype.$set = function(data) {
            var oldSession = angular.copy($session);
            angular.copy(data, this);
            defer.notify({ 'user': $session, 'old': oldSession });
        };
        sessionObject.prototype.$update = function(callback, error) {
            var oldSession = angular.copy($session);
            this.$renew(function($session) {
                defer.notify({ 'user': $session, 'old': oldSession });
                callback = callback || angular.noop;
                callback($session);
            }, error);
        };
        sessionObject.prototype.$change = function(callback) {
            return defer.promise.then(null, null, callback);
        };
        sessionObject.prototype.$changeRole = function(roleId, callback, error) {
            sessionObject.changeRole({'role_id': roleId}, function(result) {
                $session.$set(result);
                callback = callback || angular.noop;
                callback($session);
            }, error);
        };
        sessionObject.prototype.has = function(permission) {
            var permissions = this.permissions || [];
            if(!angular.isArray(permission)) {
                permission = [permission];
            }
            return !permission.diff(permissions).length;
        };
        $log.debug('Session in cookie:', $cookieStore.get('baAuthUser'));

        $session = new sessionObject($cookieStore.get('baAuthUser') || angular.copy(guestData));
        $session.$change(function() {
            if ($session.jwt_token) {
                $log.info('Set JWT token: ' + $session.jwt_token);
                jwtInterceptor.setToken($session.jwt_token);
            }
            $log.debug('Set session cookie:', $session);
            $cookieStore.put('baAuthUser', $session);
        });
        return $session;
    }]);

});
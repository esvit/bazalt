define([
    'angular', 'bz/app', 'bz/providers/bzConfig'
], function(angular, app) {
    'use strict';

    app.factory('bzSessionFactory', ['$resource', 'bzConfig', '$cookieStore', '$q', '$log',
    function ($resource, config, $cookieStore, $q, $log) {
        var sessionObject = $resource(config.resource('/auth/session'), {}, {
            'renew':    { method: 'PUT' },
            'changeRole':    { method: 'PUT', 'action': 'changeRole' },
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
                data = angular.extend(angular.copy(guestData), data);
                $session.$set(data);
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
            return permissions.indexOf(permission) >= 0;
        };
        $log.debug('Session in cookie:', $cookieStore.get('baAuthUser'));

        $session = new sessionObject($cookieStore.get('baAuthUser') || angular.copy(guestData));
        $session.$change(function() {
            $log.debug('Set session cookie:', $session);
            $cookieStore.put('baAuthUser', $session);
        });
        return $session;
    }]);

});
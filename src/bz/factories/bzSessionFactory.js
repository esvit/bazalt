define([
    'angular', 'bz/app', 'bz/providers/bzConfig'
], function(angular, app) {
    'use strict';

    app.factory('bzSessionFactory', ['$resource', 'bzConfig', '$cookieStore', '$q',
    function ($resource, config, $cookieStore, $q) {
        var sessionObject = $resource(config.resource('/auth/session'), {}, {
            'renew':    { method: 'PUT' },
            '$login':    { method: 'POST' },
            '$logout':   { method: 'DELETE' }
        }), defer = $q.defer(), $session;

        sessionObject.prototype.$login = function(data, callback, error) {
            sessionObject.$login(data, function(result) {
                $session.$set(result);
                callback = callback || angular.noop;
                callback($session);
                defer.notify($session);
            }, error);
        };
        sessionObject.prototype.$logout = function(callback, error) {
            this.$$logout(function() {
                callback = callback || angular.noop;
                callback($session);
                defer.notify($session);
            }, error);
        };
        sessionObject.prototype.$set = function(data) {
            angular.copy(data, this);
            defer.notify($session);
        };
        sessionObject.prototype.$update = function(callback, error) {
            this.$renew(function($session) {
                callback = callback || angular.noop;
                callback($session);
                defer.notify($session);
            }, error);
        };
        sessionObject.prototype.$change = function(callback) {
            return defer.promise.then(null, null, callback);
        };
        sessionObject.prototype.has = function(permission) {
            var permissions = this.permissions || [];
            return permissions.indexOf(permission) >= 0;
        };

        $session = new sessionObject($cookieStore.get('baAuthUser') || { is_guest: true });
        $session.$change(function() {
            $cookieStore.put('baAuthUser', $session);
        });
        return $session;
    }]);

});
define([
    'angular',
    'bz/app',

    'bz/factories/bzSessionFactory',

    'bz/helpers/diff'
], function(angular, app) {
    'use strict';

    app.provider('bzUser', [function() {

        // @todo add tests
        this.access = function(permissions) {
            return ['$q', 'bzUser', '$log', function($q, $user, $log) {
                if (!angular.isArray(permissions)) {
                    permissions = [];
                }
                var deferred = $q.defer(),
                    diff = permissions.diff($user.permissions || []);

                if (!diff.length) {
                    deferred.resolve(permissions);
                } else {
                    $log.debug('User haven\'t permissions:', diff);
                    deferred.reject({
                        'status': '403',
                        'message': 'Permission denied',
                        'permissions': permissions,
                        'diff': diff,
                        'user': $user
                    });
                }
                return deferred.promise;
            }];
        };

        this.$get = ['bzSessionFactory', '$cookieStore', '$rootScope', 'bzConfig', '$q',
            function($session, $cookieStore, $rootScope, $config, $q) {
                var user = $session;

            if ($config.checkSessionOnStart()) {
                $session.$update();
            }
            user.$change(function(res) {
                // console.info(res)
            });
            return user;
        }];
    }]);

});
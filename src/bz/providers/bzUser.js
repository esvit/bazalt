define([
    'angular',
    'bz/app',

    'bz/factories/bzSessionFactory',

    'bz/helpers/diff'
], function(angular, app) {
    'use strict';

    app.provider('bzUser', [function() {

        // @todo add tests
        this.access = function () {
            var permissionsSet = arguments;
            return ['$q', 'bzUser', '$log', '$rootScope', function ($q, $user, $log, $rootScope) {
                var deferred = $q.defer();
                var allowed = false;
                for (var i = 0, diff = []; i < permissionsSet.length; i++) {
                    diff = permissionsSet[i].diff($user.permissions || []);
                    allowed = (!diff.length);
                    if (allowed) {
                        break;
                    }
                }

                if (permissionsSet.length == 0 || allowed) {
                    deferred.resolve(permissionsSet);
                } else {
                    $log.debug('User haven\'t permissions:', diff);
                    $rootScope.$emit('$user:pemissionDenied', diff);
                    deferred.reject({
                        'status': '403',
                        'message': 'Permission denied',
                        'permissions': permissionsSet,
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
            return user;
        }];
    }]);

});
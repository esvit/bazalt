define([
    'angular',
    'bazalt-cms/app',

    'bazalt-cms/factories/users/session',
    'components/bcUsers/factories/UserResource'
], function(angular, app) {
    'use strict';

    app.provider('bazalt.user', [function () {
        this.$get = ['bcUsers.Factories.User', 'bazalt.users.session', '$cookieStore', '$rootScope', '$route', '$q',
            function(UserResource, SessionResource, $cookieStore, $rootScope, $routeSegment, $q) {
                var defer = $q.defer(),
                $user = {
                    data: {
                        is_guest: true
                    },
                    login: function (data, success, error) {
                        return SessionResource.login(data, function(res) {
                            success = success || angular.noop;
                            setUser(angular.extend(new UserResource(), res));
                            $routeSegment.reload();
                            success(res);
                        }, error);
                    },
                    has: function (permission) {
                        return $.inArray(permission, $user.data.permissions) >= 0;
                    },
                    logout: function (success, error) {
                        return SessionResource.logout({}, function(res) {
                            success = success || angular.noop;
                            setUser(angular.extend(new UserResource(), res));
                            $routeSegment.reload();
                            success(res);
                        }, error);
                    },
                    onLoad: function(func) {
                        defer.promise.then(func);
                    }
                };

                var setUser = function(user) {
                    $user.data = user;
                    if (user.id) {
                        $rootScope.$broadcast('$user:loginSuccess');
                    }
                    $cookieStore.put('baAuthUser', user);
                };


            if ($cookieStore.get('baAuthUser')) {
                setUser(new UserResource($cookieStore.get('baAuthUser')));
            }
            SessionResource.get(function (user) {
                setUser(angular.extend(new UserResource(), user));
                defer.resolve($user);
            });
            if (!$user) {
                setUser(new UserResource());
            }
            $rootScope.$user = $user;
            return $user;
        }];
    }]);

});
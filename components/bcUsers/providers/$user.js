define('components/bcUsers/providers/$user', [
    'angular',
    'components/bcUsers/app',

    'components/bcUsers/factories/SessionResource',
    'components/bcUsers/factories/UserResource'
], function(angular, app) {

    app.provider('$user', [function () {
        this.$get = ['bcUsers.Factories.User', 'bcUsers.Factories.Session', '$cookieStore', '$rootScope', '$route',
            function(UserResource, SessionResource, $cookieStore, $rootScope, $routeSegment) {
                var $user = {
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
                    }
                };

                var setUser = function(user) {
                    $user.data = user;
                    $cookieStore.put('baAuthUser', user);
                };


            if ($cookieStore.get('baAuthUser')) {
                setUser(new UserResource($cookieStore.get('baAuthUser')));
            }
            SessionResource.get(function (user) {
                setUser(angular.extend(new UserResource(), user));
            });
            if (!$user) {
                setUser(new UserResource());
            }
            $rootScope.$user = $user;
            return $user;
        }];
    }]);

});
define('components/bcUsers/providers/$user', [
    'angular',
    'components/bcUsers/app',

    'components/bcUsers/factories/SessionResource',
    'components/bcUsers/factories/UserResource'
], function(angular, app) {

    app.provider('$user', [function () {
        var $user = null;

        this.$get = ['bcUsers.Factories.User', 'bcUsers.Factories.Session', '$cookieStore', '$rootScope',
            function(UserResource, SessionResource, $cookieStore, $rootScope) {
                var setUser = function(user) {
                    user.login = function (success, error) {
                        return SessionResource.login(user, function(res) {
                            success = success || angular.noop;
                            setUser(angular.extend(new UserResource(), res));
                            success(res);
                        }, error);
                    };
                    user.has = function (permission) {
                        return $.inArray(permission, this.permissions) >= 0;
                    };
                    $rootScope.$user = $user = user;
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
            return $user;
        }];
    }]);

});
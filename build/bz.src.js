(function () {
define('bz/app',[
    'angular',

    'angular-resource', 'angular-route', 'angular-cookies',

    'angular-route-segment'
], function(angular) {
    'use strict';

    return angular.module('bz', [
        'ngResource', 'ngRoute', 'ngCookies', 'ngLocale',

        'route-segment', 'view-segment'
    ]);
});
define('bz/factories/bzInterceptorBuffer',[
    'bz/app'
], function (app) {
    'use strict';

    app.factory('bzInterceptorBuffer',  ['$injector', function($injector) {
        /** Holds all the requests, so they can be re-requested in future. */
        var buffer = [];

        /** Service initialized later because of circular dependency problem. */
        var $http;

        function retryHttpRequest(config, deferred) {
            function successCallback(response) {
                deferred.resolve(response);
            }
            function errorCallback(response) {
                deferred.reject(response);
            }
            $http = $http || $injector.get('$http');
            $http(config).then(successCallback, errorCallback);
        }

        return {
            /**
             * Appends HTTP request configuration object with deferred response attached to buffer.
             */
            append: function(config, deferred) {
                buffer.push({
                    config: config,
                    deferred: deferred
                });
            },

            /**
             * Retries all the buffered requests clears the buffer.
             */
            retryAll: function(updater) {
                for (var i = 0; i < buffer.length; ++i) {
                    retryHttpRequest(updater(buffer[i].config), buffer[i].deferred);
                }
                buffer = [];
            }
        };
    }]);

});
define('bz/interceptors/status403',[
    'angular',
    'bz/app',
    'bz/factories/bzInterceptorBuffer'
], function (angular, app) {
    'use strict';

    // catch unauthorizate requests
    return ['$rootScope', '$q', 'bzInterceptorBuffer',
        function ($rootScope, $q, httpBuffer) {

            $rootScope.$on('baUserLogin', function () {
                var updater = function (config) {
                    return config;
                };
                httpBuffer.retryAll(updater);
            });

            function success(response) {
                return response;
            }

            function error(response) {
                if (response.status === 403 && !response.config.ignoreAuthModule) {
                    var deferred = $q.defer();
                    httpBuffer.append(response.config, deferred);
                    $rootScope.$broadcast('$user:loginRequired');
                    return deferred.promise;
                }
                // otherwise, default behaviour
                return $q.reject(response);
            }

            return function (promise) {
                return promise.then(success, error);
            };

        }];

});
define('bz/providers/bzConfig',[
    'angular',
    'bz/app'
], function(angular, app) {
    'use strict';

    app.provider('bzConfig', [function() {
        var options = {
            api: '/api/v1',
            templatePrefix: '',
            languages: ['en'],
            checkSessionOnStart: false,
            errorTemplates: {
                403: 'views/error/403.html',
                404: 'views/error/404.html'
            }
        };

        this.errorResolver = function () {
            return {
                template: '<div ng-include="templateUrl"></div>',
                controller: ['$scope', 'error', function($scope, error) {
                    $scope.error = error;
                    $scope.templateUrl = options.errorTemplates[error.status];
                }]
            };
        };

        this.api = function (api) {
            options.api = api;
            return this;
        };

        this.templatePrefix = function (templatePrefix) {
            options.templatePrefix = templatePrefix;
            return this;
        };

        this.checkSessionOnStart = function (checkSessionOnStart) {
            options.checkSessionOnStart = checkSessionOnStart;
            return this;
        };

        this.templateUrl = function(templateUrl) {
            return function() {
                var url = options.templatePrefix + templateUrl;
                return url;
            };
        };

        this.languages = function(languages) {
            options.languages = languages;
            return this;
        };

        options = angular.isDefined(window.bazalt) ? angular.extend(options, window.bazalt) : options;

        this.$get = ['$log', function($log) {
            $log.debug('Configuration:', options);
            var self = this;
            return {
                templatePrefix: function() {
                    return options.templatePrefix;
                },
                templateUrl: function (templateUrl) {
                    return self.templateUrl(templateUrl);
                },
                checkSessionOnStart: function () {
                    return options.checkSessionOnStart;
                },
                api: function () {
                    return options.api;
                },
                resource: function (url) {
                    return options.api + url;
                },
                languages: function () {
                    return options.languages;
                }
            };
        }];
    }]);

});
define('bz/providers/bzLanguage',[
    'angular',
    'bz/app', 'bz/providers/bzConfig'
], function(angular, app) {
    'use strict';

    app.provider('bzLanguage', ['$localeProvider', function($locale) {
        this.$language = $locale.$get().id.substring(0, 2);

        this.id = function (id) {
            this.$language = id;
            return this;
        };

        this.$get = ['$log', '$rootScope', 'bzConfig', function($log, $rootScope, config) {
            var self = this;
            $log.debug('Language: ' + self.$language);
            return {
                id: function (id) {
                    if (angular.isDefined(id)) {
                        var oldLang = self.$language;
                        if (config.languages().indexOf(id) == -1) {
                            throw new Error('Language "' + id + '" not allowed');
                        }
                        $rootScope.$emit('$languageChangeStart', id, oldLang);
                        self.$language = id;
                        $log.debug('Language: ' + id);
                        $rootScope.$emit('$languageChangeSuccess', id, oldLang);
                    }
                    return self.$language;
                }
            };
        }];
    }]);

});
define('bz/factories/bzSessionFactory',[
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
define('bz/helpers/filter',[], function() {
    'use strict';

    if (!Array.prototype.filter) {
        Array.prototype.filter = function (callback) {
            var arr = [];
            callback = callback || function() {};
            for (var i = 0, count = this.length; i < count; i++) {
                if (callback(this[i])) {
                    arr.push(this[i]);
                }
            }
            return arr;
        };
    }

});
define('bz/helpers/indexOf',[], function() {
    'use strict';

    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (obj, fromIndex) {
            if (fromIndex == null) {
                fromIndex = 0;
            } else if (fromIndex < 0) {
                fromIndex = Math.max(0, this.length + fromIndex);
            }
            for (var i = fromIndex, j = this.length; i < j; i++) {
                if (this[i] === obj)
                    return i;
            }
            return -1;
        };
    }

});
define('bz/helpers/diff',['bz/helpers/filter', 'bz/helpers/indexOf'], function() {
    'use strict';

    if (!Array.prototype.diff) {
        Array.prototype.diff = function (a) {
            return this.filter(function(i) {return !(a.indexOf(i) > -1);});
        };
    }

});
define('bz/providers/bzUser',[
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
define('bz/directives/a',[
    'bz/app'
], function(app) {

    // @todo write test
    app.directive('a', ['bzLanguage', '$location', function(bzLanguage, $location) {
        return {
            restrict: 'E',
            compile: function(element, attr) {
                return function(scope, element, attr) {
                    if (!attr.href || angular.isDefined(attr.bzLangIgnore)) {
                        return;
                    }
                    // change link href for current language
                    scope.$on('$languageChangeSuccess', function(e, newLang, oldLang) {
                        var old = '/' + oldLang + '/',
                            url = attr.href;
                        if (url.indexOf(old) != -1) {
                            url = url.replace(old, '/' + newLang + '/');
                            attr.$set('href', url);
                        }
                    });
                };
            }
        };
    }]);

    return app;
});
define('bz/filters/language',[
    'bz/app',

    'bz/providers/bzLanguage'
], function(app) {
    'use strict';

    app.filter('language', ['bzLanguage', function(bzLanguage) {
        return function(value, language) {
            if (typeof value == 'undefined' || value === null) {
                return value;
            }
            language = language || bzLanguage.id();
            if (!value[language] && value.orig) {
                return value[value.orig] + ' (' + value.orig + ')';
            }
            return value[language] || value;
        }
    }]);

});
define('bz',[
    'bz/app',

    'bz/interceptors/status403',

    'bz/providers/bzLanguage',
    'bz/providers/bzConfig',
    'bz/providers/bzUser',

    'bz/directives/a',

    'bz/filters/language'
], function(app, status403interceptor) {

    app.config(['$httpProvider', function($httpProvider) {
        // send cookies via CORS
        $httpProvider.defaults.withCredentials = true;

        $httpProvider.responseInterceptors.push(status403interceptor);
    }]);

    app.run(['$rootScope', 'bzLanguage', 'bzConfig', '$location', '$log', '$route', 'bzUser',
        function($rootScope, $language, $config, $location, $log, $route, $user) {
        $log.debug('Thanks for using Bazalt CMS (http://bazalt-cms.com) by Vitalii Savchuk (esvit666@gmail.com)');

        $rootScope.$language = $language;
        $rootScope.$config = $config;
        $rootScope.$user = $user;

        // track for change language url like: /en, /ru
        $rootScope.$on('$locationChangeStart', function(e, url) {
            for (var langs = $config.languages(), count = langs.length, i = 0; i < count; i++) {
                var pos, language = langs[i];
                if ((pos = url.indexOf('/' + language + '/')) > 0) {
                    url = url.substring(pos + 3);
                    if ($language.id() != language) {
                        $log.debug('Set language: ', language);
                        $language.id(language);
                    }
                    $log.debug('Redirect to: ', url);
                    e.preventDefault();
                    $location.url(url, true);
                    $route.reload();
                    break;
                }
            }
        });

        // reload route for check permissions for new user
        $user.$change(function() {
            $route.reload();
        });
    }]);

    return app;
});}());
define([
    'angular',
    'bazalt-cms/app'
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
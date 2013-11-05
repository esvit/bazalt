define([
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
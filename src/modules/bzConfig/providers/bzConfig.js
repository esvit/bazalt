define('modules/bzConfig/providers/bzConfig', [
    'angular',
    'modules/bzConfig/app'
], function(angular, app) {
    'use strict';

    app.provider('bzConfig', [function() {
        var options = {
            mine: '/api',
            templatePrefix: ''
        };

        this.mine = function (mine) {
            options.mine = mine;
            return this;
        };
        this.templatePrefix = function (templatePrefix) {
            options.templatePrefix = templatePrefix;
            return this;
        };

        this.templateUrl = function(templateUrl) {
            return function() {
                var url = options.templatePrefix + templateUrl;
                return url;
            };
        };

        if (angular.isDefined(window.bazalt)) {
            options = angular.extend(options, window.bazalt);
        }

        this.$get = [function() {
            var self = this;
            return {
                templatePrefix: function() {
                    return options.templatePrefix;
                },
                templateUrl: function (templateUrl) {
                    return self.templateUrl(templateUrl);
                },
                mine: function () {
                    return options.mine;
                },
                resource: function (url) {
                    return options.mine + '/rest.php' + url;
                }
            };
        }];
    }]);

});
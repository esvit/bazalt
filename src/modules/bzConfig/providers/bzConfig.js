define('modules/bzConfig/providers/bzConfig', [
    'angular',
    'modules/bzConfig/app'
], function(angular, app) {
    'use strict';

    app.provider('bzConfig', [function() {
        this.mine = 'http://demo.bazalt-cms.com';

        this.templatePrefix = '';

        this.mine = function (mine) {
            this.mine = mine;
            return this;
        };
        this.templatePrefix = function (templatePrefix) {
            this.templatePrefix = templatePrefix;
            return this;
        };

        this.templateUrl = function(templateUrl) {
            var self = this;
            return function() {
                var url = self.templatePrefix + templateUrl;
                return url;
            };
        };

        this.$get = [function() {
            var self = this;
            return {
                templatePrefix: function() {
                    return self.templatePrefix;
                },
                templateUrl: function (templateUrl) {
                    return self.templateUrl(templateUrl);
                },
                mine: function () {
                    return self.mine;
                },
                resource: function (url) {
                    return self.mine + '/rest.php' + url;
                }
            };
        }];
    }]);

});
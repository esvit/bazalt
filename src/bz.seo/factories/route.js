define([
    'bz.seo/app'
], function(app) {
    'use strict';

    app.factory('bz.seo.factories.route', ['$resource', 'bzConfig', function ($resource, config) {
        var service = $resource(config.resource('/seo/routes/'), {}, {
        });

        return service;
    }]);

});
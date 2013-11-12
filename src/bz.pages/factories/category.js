define([
    'bz.pages/app'
], function(app) {
    'use strict';

    app.factory('bz.pages.factories.category', ['bzNestedResource', 'bzConfig', function (ngNestedResource, config) {
        var service = ngNestedResource(config.resource('/pages/categories/:id'), { 'id': '@id' }, {});

        return service;
    }]);

});
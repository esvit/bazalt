define([
    'bazalt-cms/app', 'bazalt-cms/providers/bzConfig'
], function(app) {
    'use strict';

    app.factory('bazalt.pages.page', ['$resource', 'bzConfig', function ($resource, config) {
        var service = $resource(config.resource('/pages/:id'), { 'id': '@id' }, {
            'hit': { 'method': 'PUT', 'params': { 'action': 'view' } } // increase view counter
        });

        return service;
    }]);

});
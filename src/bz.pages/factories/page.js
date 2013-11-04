define([
    'bz.pages/app'
], function(app) {
    'use strict';

    app.factory('bz.pages.factories.page', ['$resource', 'bzConfig', function ($resource, config) {
        var service = $resource(config.resource('/pages/:id'), { 'id': '@id' }, {
            'hit': { 'method': 'PUT', 'params': { 'action': 'view' } } // increase view counter
        });

        return service;
    }]);

});
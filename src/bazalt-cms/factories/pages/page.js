define([
    'bazalt-cms/app', 'bazalt-cms/providers/config'
], function(app) {
    'use strict';

    app.factory('bazalt.pages.page', ['$resource', 'bazalt.config', function ($resource, config) {
        var service = $resource(config.resource('/pages/:id'), { 'id': '@id' }, {
            'hit': { 'method': 'PUT', 'params': { 'action': 'view' } } // increase view counter
        });

        return service;
    }]);

});
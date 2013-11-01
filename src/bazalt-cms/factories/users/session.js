define([
    'bazalt-cms/app', 'bazalt-cms/providers/config'
], function(app) {
    'use strict';

    app.factory('bazalt.users.session', ['$resource', 'bazalt.config', function ($resource, config) {
        var service = $resource(config.resource('/auth/session'), {}, {
            'login':    { method: 'POST' },
            'logout':   { method: 'DELETE' }
        });

        return service;
    }]);

});
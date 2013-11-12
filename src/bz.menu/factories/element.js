define([
    'bz.menu/app'
], function(app) {
    'use strict';

    app.factory('bz.menu.factories.element', ['ngNestedResource', 'bzConfig', function (ngNestedResource, bzConfig) {
        return ngNestedResource(bzConfig.resource('/menu/:id'), { 'id': '@id' }, {
            update: { method: 'POST' },
            getSettings: { method: 'POST', params: { 'action': 'getSettings' }, isArray: false }
        });
    }]);

});
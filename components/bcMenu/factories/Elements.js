define('components/bcMenu/factories/Elements', [
    'components/bcMenu/app'
], function(app) {
    'use strict';

    app.factory('bcMenu.Factories.Elements', ['ngNestedResource', 'bzConfig', function (ngNestedResource, bzConfig) {
        var MenuElementsService = ngNestedResource(bzConfig.resource('/menu/:id'), { 'id': '@id' }, {
            update: { method: 'POST' },
            getSettings: { method: 'POST', params: { 'action': 'getSettings' }, isArray: false }
        });
        return MenuElementsService;
    }]);

});
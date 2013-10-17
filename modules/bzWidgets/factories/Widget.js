define('modules/bzWidgets/factories/Widget', [
    'modules/bzWidgets/app'
], function(app) {
    'use strict';

    app.factory('bzWidgets.Factories.Widget', ['$resource', function($resource) {
        return $resource('/api/rest.php/widgets/:id', { 'id': '@' }, {
            create: { method: 'PUT' },
            changeOrder: { method: 'GET', params: { 'action': 'changeOrder' } },
            getSettings: { method: 'GET', params: { 'action': 'getSettings' } }
        });
    }]);
});
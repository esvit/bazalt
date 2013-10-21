define('components/bcUsers/factories/MessageResource', [
    'components/bcUsers/app'
], function(app) {

    app.factory('bcUsers.Factories.Message', ['$resource', 'bzConfig',
        function ($resource, bzConfig) {
        return $resource(bzConfig.resource('/auth/users/:userId/messages/:id'), { 'id': '@id', 'userId': '@user_id' }, {
            'checkEmail': { method: 'GET', params: { 'action': 'checkEmail' } },
            'delete': { method: 'DELETE' },
            'changePassword': { method: 'PUT', params: { 'action': 'changePassword' } },
            'activate': { method: 'GET', params: { 'action': 'activate' } },
            'register': { method: 'POST' }
        });
    }]);

});
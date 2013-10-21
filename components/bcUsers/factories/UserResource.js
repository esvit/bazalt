define('components/bcUsers/factories/UserResource', [
    'components/bcUsers/app',

    'components/bcUsers/factories/SessionResource'
], function(app) {

    app.factory('bcUsers.Factories.User', ['$resource', 'bzConfig',
        function ($resource, bzConfig) {
        var UserResource = $resource(bzConfig.resource('/auth/users/:id'), { 'id': '@id' }, {
            'checkEmail': { method: 'GET', params: { 'action': 'checkEmail' } },
            'delete': { method: 'DELETE' },
            'changePassword': { method: 'PUT', params: { 'action': 'changePassword' } },
            'activate': { method: 'GET', params: { 'action': 'activate' } },
            'register': { method: 'POST' }
        });
        return UserResource;
    }]);

});
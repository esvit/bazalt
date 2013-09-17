define('components/bcUsers/factories/UserResource', [
    'components/bcUsers/app'
], function(app) {

    app.factory('bcUsers.Factories.User', ['$resource', '$q', 'baConfig', function ($resource, $q, baConfig) {
        return $resource(baConfig.apiEndpoint() + '/users/:id', { 'id': '@id' }, {
            'checkEmail': { method: 'GET', params: { 'action': 'checkEmail' } },
            'delete': { method: 'DELETE' }
        });
    }]);

});
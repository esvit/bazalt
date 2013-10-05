define('components/bcUsers/factories/SessionResource', [
    'components/bcUsers/app'
], function(app) {

    app.factory('bcUsers.Factories.Session', ['$resource', 'bzConfig', function ($resource, bzConfig) {
        return $resource(bzConfig.resource('/auth/session'), {}, {
            'login': { method: 'POST' },
            'logout': { method: 'DELETE' }
        });
    }]);

});
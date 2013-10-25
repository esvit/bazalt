define('components/bcUsers/factories/MessageResource', [
    'components/bcUsers/app'
], function(app) {

    app.factory('bcUsers.Factories.Message', ['$resource', 'bzConfig',
        function ($resource, bzConfig) {
        return $resource(bzConfig.resource('/auth/users/:userId/messages/:id'), { 'id': '@id', 'userId': '@user_id' }, {
            'send': { method: 'POST' }
        });
    }]);

});
define('components/bcUsers/factories/GiftResource', [
    'components/bcUsers/app'
], function(app) {

    app.factory('bcUsers.Factories.Gift', ['$resource', 'bzConfig',
        function ($resource, bzConfig) {
        return $resource(bzConfig.resource('/auth/users/:user_id/gifts/:id'), { 'id': '@id', 'user_id': '@user_id' }, {
            'prepare': { 'method': 'PUT' }
        });
    }]);

});
define('components/bcUsers/factories/RoleResource', [
    'components/bcUsers/app'
], function(app) {

    app.factory('bcUsers.Factories.Role', ['$resource', 'bzConfig',
        function ($resource, bzConfig) {
            return $resource(bzConfig.resource('/auth/users/:id/roles'), { 'id': '@id' }, {
        });
    }]);

});
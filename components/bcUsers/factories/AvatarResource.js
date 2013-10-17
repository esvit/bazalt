define('components/bcUsers/factories/AvatarResource', [
    'components/bcUsers/app'
], function(app) {

    app.factory('bcUsers.Factories.Avatar', ['$resource', '$q', 'baConfig', function ($resource, $q, baConfig) {
        return $resource(baConfig.apiEndpoint() + '/users/:id/avatar', { 'id': '@id' }, {
        });
    }]);

});

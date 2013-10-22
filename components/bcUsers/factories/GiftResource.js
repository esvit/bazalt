define('components/bcUsers/factories/GiftResource', [
    'components/bcUsers/app'
], function(app) {

    app.factory('bcUsers.Factories.Gift', ['$resource', 'bzConfig',
        function ($resource, bzConfig) {
        return $resource(bzConfig.resource('/auth/users/gift/:id'), { 'id': '@id' }, {
        });
    }]);

});
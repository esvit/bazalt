define('factories/ProfilesResource', [
    'app'
], function(module) {

    module.factory('ProfilesResource', ['$resource', function ($resource) {
        return $resource('/api/rest.php/profiles/:id', { 'id': '@id' }, {
        });
    }]);

});
define('factories/ProfileResource', [
    'app'
], function(module) {

    module.factory('ProfileResource', ['$resource', function ($resource) {
        return $resource('/api/rest.php/profile/:id', { 'id': '@id' }, {
        });
    }]);

});
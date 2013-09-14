define('components/bcUsers/backend/controllers/UserEdit', [
    'components/bcUsers/backend/app'
], function (app) {
    'use strict';

    app.factory('ProfileResource', ['$resource', function ($resource) {
        return $resource('/api/rest.php/profile/:id', { 'id': '@id' }, {
        });
    }]);
    app.controller('bcUsers.Controllers.UserEdit',
        ['$scope', '$location', 'baUserResource', 'baRoleResource', '$routeParams', 'ProfileResource',
        function ($scope, $location, baUserResource, baRoleResource, $routeParams, ProfileResource) {

            baUserResource.get({ 'id': $routeParams.id }, function (user) {
                $scope.user = user;
            });
            baRoleResource.get(function (roles) {
                $scope.roles = roles.data;
            });

            $scope.toggleRole = function (roleId) {
                if ($scope.user.roles.indexOf(roleId) === -1) {
                    $scope.user.roles.push(roleId);
                } else {
                    $scope.user.roles.splice($scope.user.roles.indexOf(roleId), 1);
                }
            };

            $scope.saveUser = function(user) {
                user.$save();
                $location.path('/users');
            };

            $scope.profile = ProfileResource.get({'id': $routeParams.id});

            $scope.saveProfile = function(user) {
                $scope.user.$save();
                var profile = new ProfileResource(user);
                profile.id = $scope.user.id;
                $scope.loading = true;
                profile.$save(function(user) {
                    $scope.loading = false;
                    $scope.settings = null;
                    $location.path('/users');
                });
            };
        }]);


});
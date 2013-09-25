define('components/bcUsers/controllers/ProfileSettings', [
    'components/bcUsers/app'
], function (app) {
    'use strict';

    app.controller('bcUsers.Controllers.ProfileSettings',
        ['$scope', 'bcUsers.Factories.User', '$rootScope', '$fileUploader', '$parse',
            function ($scope, UserResource, $rootScope, $fileUploader, $parse) {

                var uploader = null;

                $scope.$watch('user.id', function(userId) {
                    if (angular.isDefined(userId) && uploader == null) {
                        uploader = $fileUploader.create({
                            scope: $scope,                          // to automatically update the html. Default: $rootScope
                            url: '/api/rest.php/users/' + userId + '/avatar'
                        });

                        uploader.bind('afteraddingfile', function (event, item) {
                            item.upload();
                        });

                        uploader.bind('success', function (event, xhr, item) {
                            var response = $parse(xhr.response)();
                            $scope.user.avatar = response.thumbnailUrl;
                        });
                    }
                });

                UserResource.get({ 'id': $rootScope.user.id }, function(user) {
                    $scope.loading = false;
                    if (!user.images) {
                        user.images = [];
                    }
                    $scope.user = user;
                });
        }]);
});
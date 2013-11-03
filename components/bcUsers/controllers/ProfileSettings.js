define('components/bcUsers/controllers/ProfileSettings', [
    'angular',

    'components/bcUsers/app'
], function (angular, app) {
    'use strict';

    app.controller('bcUsers.Controllers.ProfileSettings',
                ['$scope', 'bcUsers.Factories.User', '$rootScope', '$fileUploader', '$parse', '$user', '$routeSegment',
                    function ($scope, UserResource, $rootScope, $fileUploader, $parse, $user, $routeSegment) {

                var uploader = null,
                    userId = $routeSegment.$routeParams.user_id || $user.data.id;
                $scope.isOwnProfile = angular.isUndefined($routeSegment.$routeParams.user_id) || $routeSegment.$routeParams.user_id == $user.data.id;

                $scope.$watch('user.id', function (userId) {
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

                UserResource.get({ 'id': userId }, function (user) {
                    $scope.user = user;
                    $scope.loading = false;
                    if (!user.images) {
                        user.images = [];
                    }
                });

                $scope.sendGift = function () {
                    $('#giftsModal').modal();
                };
                $scope.sendMessage = function () {
                    $('#sendMessage').modal();
                };
            }]);

});
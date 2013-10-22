define('components/bcUsers/controllers/ProfileSettings', [
    'angular',

    'components/bcUsers/app'
], function (angular, app) {
    'use strict';

    app.controller('bcUsers.Controllers.ProfileSettings',
        ['$scope', 'bcUsers.Factories.User', '$rootScope', '$fileUploader', '$parse', '$user',
            function ($scope, UserResource, $rootScope, $fileUploader, $parse, $user) {

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

                UserResource.get({ 'id': $user.data.id }, function(user) {
                    $scope.loading = false;
                    if (!user.images) {
                        user.images = [];
                    }
                    $scope.user = user;
                });
        }]);

    $( ".user-avatar .b-gifts" ).click(function() {
        $('#giftsModal').modal();
        return false;
    });
    $('.gifts-type a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    });

});
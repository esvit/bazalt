define('controllers/ProfileSettings', [
    'app'
], function(app) {

    app.controller('ProfileSettings', ['$scope', 'ProfileResource', '$routeParams', '$timeout', '$route',
        function($scope, ProfileResource, $location, $routeParams, $timeout, $route) {

            $scope.user = {
                images: []
            };
            $scope.loading = true;
            ProfileResource.get({ 'id': $routeParams.id }, function(user) {
                $scope.loading = false;
                if (!user.images) {
                    user.images = [];
                }
                $scope.user = user;
                /*$timeout(function() {
                 $('.elastislide-list').elastislide();
                 $timeout(function() {
                 $('.thumbnail').fancybox();
                 }, 100)
                 }, 100)*/
            });

            /*$scope.$watch('amount', function(value) {
                var bill = new LiqPayResource({ amount: value });

                bill.$get(function(data) {
                    $scope.data = data;
                });
            });*/

            $scope.saveProfile = function(user) {
                var profile = new ProfileResource(user);
                $scope.loading = true;
                profile.$save(function(user) {
                    $scope.loading = false;
                    $scope.settings = null;
                    $route.reload();
                });
            }
        }]);
});
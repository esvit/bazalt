define('components/bcUsers/controllers/Profile/ModalGifts', [
    'components/bcUsers/app',

    'components/bcUsers/factories/GiftResource'
], function (app) {
    'use strict';

    app.controller('bcUsers.Controllers.Profile.ModalGifts',
        ['$scope', 'bcUsers.Factories.User', '$rootScope', '$routeSegment', '$user', 'bcUsers.Factories.Gift',
            'bcPayments.Factories.Transaction',
            function ($scope, UserResource, $rootScope, $routeSegment, $user, GiftResource, TransactionResource) {
                $scope.loading = true;
                GiftResource.get(function(res) {
                    $scope.loading = false;
                    $scope.gifts = res.data;

                    console.info(res.data);
                });

                $scope.prepareGift = function(gift) {
                    $scope.loading = true;
                    var g = new GiftResource(gift);
                    g.user_id = $routeSegment.$routeParams.user_id;
                    g.$prepare(function(res) {
                        $scope.loading = false;
                        console.info(res);
                    }, function(res) {
                        $scope.loading = false;
                        if (res.status == 402) {
                            $scope.needPay = true;
                            $scope.needToPay = res.data;
                        }
                    });
                };
            }]);
});

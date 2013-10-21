define('components/bcUsers/controllers/Profile/Messages', [
    'components/bcUsers/app',

    'components/bcUsers/factories/MessageResource'
], function (app) {
    'use strict';

    app.controller('bcUsers.Controllers.Profile.Messages',
        ['$scope', 'ngTableParams', '$location', 'bcUsers.Factories.Message', '$user',
            function ($scope, ngTableParams, $location, MessageResource, $user) {


                $scope.tableParams = new ngTableParams({
                    page: 1,            // show first page
                    count: 10           // count per page
                }, {
                    total: 0, // length of data
                    getData: function($defer, params) {
                        var data = params.url();
                        data.userId = $user.data.id;
                        MessageResource.get(data, function(res) {
                            $defer.resolve(res.data);
                        });
                    }
                });

            }]);

});
define('components/bcFiles/backend/controllers/Main', [
    'components/bcFiles/app'
], function (app) {
    'use strict';

    app.controller('bcFiles.Controllers.Main',
        ['$scope', 'bzConfig',
            function ($scope, bzConfig) {
                $scope.url  = bzConfig.resource('/files').replace('\\:', ':');
            }]);

});
define('components/bcFiles/backend/module', [
    'components/bcFiles/backend/app',

    'components/bcFiles/backend/controllers/Main'
], function(app) {
    'use strict';

    app.config(['$routeSegmentProvider', 'bzConfigProvider',
        function ($routeSegmentProvider, bzConfig) {

        $routeSegmentProvider
            .when('/files', 'files');

        $routeSegmentProvider
            .segment('files', {
                templateUrl: bzConfig.templateUrl('/components/bcFiles/backend/views/main.html'),
                controller: 'bcFiles.Controllers.Main'
            });
    }]);

});
define('components/bcFiles/backend/module', [
    'components/bcFiles/backend/app',

    'components/bcFiles/backend/controllers/Main'
], function(app) {
    'use strict';

    app.config(['$routeSegmentProvider',
        function ($routeSegmentProvider) {

        $routeSegmentProvider
            .when('/files', 'files');

        $routeSegmentProvider
            .segment('files', {
                templateUrl: '/src/components/bcFiles/backend/views/main.html',
                controller: 'bcFiles.Controllers.Main'
            });
    }]);

});
define('components/bcUsers/backend/module', [
    'components/bcUsers/backend/app',

    'components/bcUsers/backend/controllers/Main',
    'components/bcUsers/backend/controllers/UserEdit'
], function(app) {
    'use strict';

    app.config(['$routeSegmentProvider',
        function ($routeSegmentProvider) {

        $routeSegmentProvider
            .when('/users', 'users')
            .when('/users/:id', 'usersEdit');

        $routeSegmentProvider
            .segment('users', {
                templateUrl: '/src/components/bcUsers/backend/views/list.html',
                controller: 'bcUsers.Controllers.Main'
            })
            .segment('usersEdit', {
                templateUrl: '/src/components/bcUsers/backend/views/edit.html',
                dependencies: ['id'],
                controller: 'bcUsers.Controllers.UserEdit'
            });
    }]);
});
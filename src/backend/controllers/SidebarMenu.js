define('backend/controllers/SidebarMenu', [
    'backend/app'
], function(app) {
    'use strict';

    app.controller('Backend.Controllers.SidebarMenu', ['$scope', '$translate', function($scope, $translate) {

        $scope.items = [
            {
                'text': $translate('Dashboard'),
                'link': '#!/'
            },
            {
                'text': 'Pages',
                'link': '#!/pages',
                'items': [{
                    'text': 'Pages',
                    'link': '#!/pages'
                },{
                    'text': 'Categories',
                    'link': '#!/pages/categories'
                }]
            },
            {
                'text': 'Menu',
                'link': '#!/menu'
            },
            {
                'text': 'Users',
                'link': '#!/users'
            }
        ];
    }]);
});
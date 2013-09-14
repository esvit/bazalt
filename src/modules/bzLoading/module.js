define('modules/bzLoading/module', [
    'modules/bzLoading/app',

    'modules/bzLoading/directives/bzLoadingContainer'
], function(app) {
    'use strict';

    app.run(['$rootScope', function($rootScope) {
        $rootScope.$loading = true;

        /*$rootScope.$on('routeSegmentChange', function() {
            $rootScope.$loading = true;
        });*/
        $rootScope.$on('$routeChangeStart', function() {
            $rootScope.$loading = true;
        });
        $rootScope.$on('$routeChangeSuccess', function() {
            $rootScope.$loading = false;
        });
    }]);

});
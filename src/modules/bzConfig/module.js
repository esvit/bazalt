define('modules/bzConfig/module', [
    'modules/bzConfig/app',

    'modules/bzConfig/providers/bzConfig'
], function(app) {

    app.config(['$httpProvider', function($httpProvider) {
        // send cookies via CORS
        $httpProvider.defaults.withCredentials = true;
    }])

});
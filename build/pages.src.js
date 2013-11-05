(function () {
define('bz.pages/app',[
    'angular', 'bz'
], function(angular) {
    'use strict';

    return angular.module('bz.pages', ['bz']);
});
define('bz.pages/factories/page',[
    'bz.pages/app'
], function(app) {
    'use strict';

    app.factory('bz.pages.factories.page', ['$resource', 'bzConfig', function ($resource, config) {
        var service = $resource(config.resource('/pages/:id'), { 'id': '@id' }, {
            'hit': { 'method': 'PUT', 'params': { 'action': 'view' } } // increase view counter
        });

        return service;
    }]);

});
define('bz.pages/controllers/page',[
    'bz.pages/app',

    'bz.pages/factories/page'
], function(app) {
    'use strict';

    app.controller('bz.pages.controllers.page',
        ['$scope', 'page', 'bz.pages.factories.page', function($scope, page, PageFactory) {
            $scope.page = page;
            PageFactory.hit({ 'id': page.id });
        }]);

});
define('bz/pages',[
    'bz.pages/app',

    'bz.pages/controllers/page'
], function(app) {

    //app.config([function() {}]);

    //app.run([function() {}]);

    return app;
});}());
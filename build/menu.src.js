(function () {
define('bz.menu/app',[
    'angular', 'bz', 'ng-editable-tree'
], function(angular) {
    'use strict';

    return angular.module('bz.menu', ['bz', 'ngEditableTree']);
});
define('bz.menu/factories/element',[
    'bz.menu/app'
], function(app) {
    'use strict';

    app.factory('bz.menu.factories.element', ['ngNestedResource', 'bzConfig', function (ngNestedResource, bzConfig) {
        return ngNestedResource(bzConfig.resource('/menu/:id'), { 'id': '@id' }, {
            update: { method: 'POST' },
            getSettings: { method: 'POST', params: { 'action': 'getSettings' }, isArray: false }
        });
    }]);

});
define('bz.menu/factories/menu',[
    'angular',
    'bz.menu/app',
    'bz.menu/factories/element'
], function(angular, app) {
    'use strict';

    app.factory('bz.menu.factories.menu', ['$resource', 'bz.menu.factories.element', 'bzConfig',
        function ($resource, ElementsService, bzConfig) {
            var MenuService = $resource(bzConfig.resource('/menu/:id'), { 'id': '@id' }, {
                create: { method: 'PUT' }
            });
            MenuService.prototype.getElements = function(cb, allItems) {
                cb = cb || angular.noop;
                allItems = allItems || false;
                ElementsService.getTree({ 'id': this.id, 'all': allItems }, cb);
            };
            return MenuService;
        }
    ]);

});
define('bz/menu',[
    'bz.menu/app',

    'bz.menu/factories/menu'
], function(app) {

    //app.config([function() {}]);

    //app.run([function() {}]);

    return app;
});}());
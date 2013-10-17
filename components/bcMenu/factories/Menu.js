define('components/bcMenu/factories/Menu', [
    'angular',
    'components/bcMenu/app',
    'components/bcMenu/factories/Elements'
], function(angular, app) {
    'use strict';

    app.factory('bcMenu.Factories.Menu', ['$resource', 'bcMenu.Factories.Elements', 'bzConfig',
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
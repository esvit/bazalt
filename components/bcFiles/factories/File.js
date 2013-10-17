define('components/bcFiles/factories/Menu', [
    'angular',
    'components/bcFiles/app'
], function(angular, app) {
    'use strict';

    app.factory('bcFiles.Factories.File', ['$resource', 'bcMenu.Factories.Elements',
        function ($resource, ElementsService) {
            var MenuService = $resource('/api/rest.php/menu/:id', { 'id': '@id' }, {
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
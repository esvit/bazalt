define([
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
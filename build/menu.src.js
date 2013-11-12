(function () {
define('bz.menu/app',[
    'angular', 'bz', 'bz-nested-model'
], function(angular) {
    'use strict';

    return angular.module('bz.menu', ['bz', 'bzNestedModel']);
});
define('bz.menu/directives/bzMenuNav',[
    'bz.menu/app'
], function(app) {

    app.directive('bzMenuNav', ['$parse', '$compile', 'bzUser', function($parse, $compile, bzUser) {
            var template =  '<ul ng-class="class">' +
                '           <li ng-repeat="item in items" ng-class="{active:node.active && item.$active==true, \'dropdown\': item.items.length}">' +
                '               <a href="{{item.url}}" target="{{item.target}}" class="dropdown-toggle">{{item.title}}</a>' +
                '               <div els-menu="item.items" menu-class="item.class"></div>' +
                '           </li>' +
                '</ul>';
            return {
                restrict: 'A',
                scope:{
                    'menu': '=bzMenuNav',
                    'class': '=menuClass'
                },
                replace: true,
                compile: function(element, attrs) {
                    return function (scope, element, attrs) {
                        scope.$watch('menu', function(menu) {
                            if (angular.isArray(menu) && menu.length > 0) {
                                var items = menu;
                                angular.forEach(menu, function(item, n) {
                                    item.access = item.access || [];
                                    item.class = item.class || [];
                                    item.class.push('dropdown-menu');
                                    if (!bzUser.has(item.access)) {
                                        items.splice(n - 1, 1);
                                    }
                                });
                                scope.items = items;
                                var temp = (items.length < 1) ? template : template.replace('class="dropdown-toggle"', '');

                                var el = angular.element(temp);
                                element.replaceWith($compile(el)(scope));
                            }
                        });
                    };
                }
            };
        }]);

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

    'bz.menu/directives/bzMenuNav',
    'bz.menu/factories/menu'
], function(app) {

    //app.config([function() {}]);

    //app.run([function() {}]);

    return app;
});}());
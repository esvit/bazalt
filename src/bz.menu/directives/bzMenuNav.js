define([
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
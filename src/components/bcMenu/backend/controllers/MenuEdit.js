define('components/bcMenu/backend/controllers/MenuEdit', [
    'angular',

    'components/bcMenu/app'
], function (angular, app) {
    'use strict';

    app.controller('bcMenu.Controllers.MenuEdit',
        ['$scope', '$rootScope', '$filter', '$location', '$routeParams', 'bcMenu.Factories.Menu', 'bcMenu.Factories.Elements',
            function ($scope, $rootScope, $filter, $location, $routeParams, MenuService, MenuElementsService) {
                $scope.loading = {
                    menus: false,
                    elements: false
                };

                var menuId = $routeParams.id;
                angular.forEach($scope.menus, function (item) {
                    if (item.id == menuId) {
                        $scope.$parent.menu = item;
                    }
                });

                if ($scope.$parent.menu) {
                    $scope.loading.elements = true;
                    $scope.$parent.menu.getElements(function (result) {
                        $scope.loading.elements = false;
                        $scope.$parent.menu = result;
                    }, true);
                }

                /**
                 * Create new menu elements
                 */
                $scope.addChild = function (child) {
                    $scope.loading.elements = true;
                    child.$insertItem(function (item) {
                        $scope.loading.elements = false;
                        item.focus = true;
                        item.$settings = true;
                    });
                };

                $scope.saveItem = function (item) {
                    var menu = new MenuElementsService(item);
                    menu.$save();
                };

                $scope.remove = function (child) {
                    function walk(target) {
                        var children = target.children,
                            i;
                        if (children) {
                            i = children.length;
                            while (i--) {
                                if (children[i].id === child.id) {
                                    return children.splice(i, 1);
                                } else {
                                    walk(children[i]);
                                }
                            }
                        }
                    }

                    if (!child.depth) {
                        $scope.loading.menus = true;
                    }
                    $scope.loading.elements = true;
                    MenuElementsService.delete({ 'id': child.id }, function () {
                        $scope.loading.elements = false;
                        if (!child.depth) {
                            $scope.$parent.menu = null;
                            $scope.loading.menus = false;
                            angular.forEach($scope.menus, function (item, key) {
                                if (item.id == child.id) {
                                    $scope.menus.splice(key, 1);
                                }
                            });
                        } else {
                            walk($scope.$parent.menu);
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                        }
                    });
                };

                $scope.move = function (item, before, index) {
                    $scope.loading.elements = true;
                    item.$moveItem(before, index, function () {
                        $scope.loading.elements = false;
                    });
                };
                $scope.saveItem = function (item) {
                    var menu = new MenuElementsService(item);
                    menu.children = [];

                    $scope.loading.elements = true;
                    menu.$save(function () {
                        $scope.loading.elements = false;
                        //item = new MenuElementsService(result);
                    });
                };

            }]);

});
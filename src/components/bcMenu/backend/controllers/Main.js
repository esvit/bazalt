define('components/bcMenu/backend/controllers/Main', [
    'components/bcMenu/app'
], function (app) {
    'use strict';

    app.controller('bcMenu.Controllers.Main',
        ['$scope', '$rootScope', '$filter', '$location', '$routeSegment', 'bcMenu.Factories.Menu', 'bcMenu.Factories.Elements',
            function ($scope, $rootScope, $filter, $location, $routeSegment, MenuService, MenuElementsService) {
                $scope.loading = {
                    menus: false
                };
                $scope.$routeSegment = $routeSegment;

                $scope.loading.menus = true;
                $scope.menus = MenuService.query(function () {
                    $scope.loading.menus = false;
                });

                if ($routeSegment.$routeParams.id) {
                    $scope.loading.elements = true;
                    MenuService.get({ 'id': $routeSegment.$routeParams.id }, function(menu) {
                        $scope.menu = menu;
                        $scope.loading.elements = false;
                    });
                }

                /**
                 * Create new menu
                 */
                $scope.createMenu = function (menu) {
                    if ($scope.newMenu.$invalid) {
                        return;
                    }
                    menu.busy = true;
                    MenuService.create(menu, function (menu) {
                        $scope.nMenu = { busy: false };
                        menu.children = [];
                        $scope.menus.push(new MenuElementsService(menu));
                        $location.path('/menu/' + menu.id);
                    });
                };

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

                $scope.saveItem = function (child) {
                    var item = new MenuElementsService(child);
                    $scope.loading.menus = true;
                    item.$save(function() {
                        $scope.loading.menus = false;
                        child.$edit = false;
                    });
                };
                $scope.remove = function (child) {
                    $scope.loading.menus = true;
                    MenuElementsService.delete({ 'id': child.id }, function () {
                        $scope.loading.menus = false;
                        angular.forEach($scope.menus, function (item, key) {
                            if (item.id == child.id) {
                                $scope.menus.splice(key, 1);
                            }
                        });
                        $location.path('/menu');
                    });
                };
            }]);

});
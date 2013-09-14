define('components/bcMenu/backend/controllers/MainSettings', [
    'components/bcMenu/app'
], function (app) {
    'use strict';

    app.controller('bcMenu.Controllers.MainSettings',
        ['$scope', '$rootScope', '$filter', '$location', '$routeParams', '$timeout', 'bcMenu.Factories.Menu', 'bcMenu.Factories.Elements',
            'bzMenu.Types',
            function ($scope, $rootScope, $filter, $location, $routeParams, $timeout, MenuService, MenuElementsService, menuTypes) {

                $scope.loading = false;
                $scope.menuTypes = menuTypes;
                $scope.saveItem = function (item) {
                    var menu = new MenuElementsService(item);
                    menu.children = [];

                    $scope.loading = true;
                    menu.$save(function(result) {
                        $scope.loading = false;
                        //item = new MenuElementsService(result);
                    });
                };

                for (var i = 0; i < menuTypes.length; i++) {
                    if ($scope.child.menuType == menuTypes[i].id) {
                        $scope.currentType = menuTypes[i];
                    }
                }

                $scope.addDescription = function(item, language) {
                    if (!item.description) {
                        item.description = {};
                    }
                    item.description[language] = '';
                };

                $scope.changeMenuType = function(item) {
                    console.info(item);
                    for (var i = 0; i < menuTypes.length; i++) {
                        if (item.menuType == menuTypes[i].id) {
                            $scope.currentType = menuTypes[i];
                        }
                    }
                };

            }]);

});
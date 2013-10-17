define('modules/bzWidgets/directives/widget', [
    'angular',

    'modules/bzWidgets/app',

    'modules/bzWidgets/factories/Widget'
], function(angular, app) {
    'use strict';

    app.directive('bzWidget',
        ['$compile', 'bzWidgets', '$parse', '$injector', '$q',
            function($compile, bzWidgets, $parse, $injector, $q) {

        return {
            scope: true,
            restrict: 'A',
            template: '<div ng-include="widget.$settings.templateUrl || widget.templateUrl()"></div>',
            controller: ['$scope', '$q', '$controller', 'bzWidget', function($scope, $q, $controller, $widget) {
                $scope.createWidget = function(widget) {
                    var deferred = $q.defer();
                    widget.$settings = widget.$settings || {};
                    angular.copy(widget, $widget);

                    if (widget.resolve) {
                        var promises = {};
                        angular.forEach(widget.resolve, function(item, key) {
                            promises[key] = $injector.invoke(item);
                        });
                        deferred = $q.all(promises);
                    } else {
                        deferred.resolve({});
                        deferred = deferred.promise;
                    }

                    $scope.widget.$loading = true;
                    deferred.then(function(data){
                        $scope.widget = widget;
                        $scope.widget.$loading = false;

                        angular.forEach(data, function(item, key) {
                            $scope[key] = item;
                        });
                        if (widget.controller) {
                            $scope.$scope = $scope;
                            $scope.widget = widget;
                            $controller(widget.controller, $scope);
                        }
                    });
                };
            }],
            link: function(scope, element, attrs) {
                var resolveSettings = $q.defer();
                scope.$watch(attrs.bzWidget, function(id) {
                    scope.widget = angular.copy(bzWidgets.widget(id));
                    resolveSettings.promise.then(function onResolve() {
                        if (scope.widget) {
                            scope.createWidget(scope.widget);
                            resolveSettings = $q.defer();
                            resolveSettings.promise.then(onResolve);
                        }
                    });
                }, true);
                scope.$watch(attrs.settings, function(settings) {
                    if (!scope.widget) {
                        return;
                    }
                    scope.widget.$settings = settings;

                    resolveSettings.resolve(settings);
                }, true);
            }
        };
    }]);

});
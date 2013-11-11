define([
    'bz/app'
], function(app) {

    app.directive('bzLoadingContainer', function() {
        return {
            restrict: 'A',
            scope: false,
            link: function(scope, element, attrs) {
                var loadingLayer = angular.element(document.createElement('div')).addClass('loading').appendTo(element);
                element.addClass('loading-container');
                scope.$watch(attrs.bzLoadingContainer, function(value) {
                    loadingLayer.toggle(value);
                });
            }
        };
    });

});
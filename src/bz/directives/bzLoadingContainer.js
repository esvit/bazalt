define([
    'bz/app'
], function(app) {

    app.directive('bzLoadingContainer', function() {
        return {
            restrict: 'A',
            scope: false,
            link: function(scope, element, attrs) {
                var loadingLayer = angular.element(document.createElement('div')).addClass('loading');
                element.addClass('loading-container').append(loadingLayer);
                scope.$watch(attrs.bzLoadingContainer, function(value) {
                    loadingLayer.toggleClass('ng-hide', !!value);
                });
            }
        };
    });

});
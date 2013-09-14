define('modules/bzLoading/directives/bzLoadingContainer', [
    'modules/bzLoading/app'
], function(app) {

    app.directive('bzLoadingContainer', function() {
        return {
            restrict: 'A',
            scope: false,
            link: function(scope, element, attrs) {
                var loadingLayer = $('<div class="loading"></div>').appendTo(element);
                $(element).addClass('loading-container');
                scope.$watch(attrs.bzLoadingContainer, function(value) {
                    loadingLayer.toggle(value);
                });
            }
        };
    });

});
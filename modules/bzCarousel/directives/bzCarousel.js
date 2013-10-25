define('modules/bzCarousel/directives/bzCarousel', [
    'modules/bzCarousel/app'
], function (app) {
    'use strict';

    app.directive('bzCarousel', function () {
        return {
            restrict: 'A',
            template: '<div id="slider" class="carousel slide">'+
                '<div class="carousel-inner">'+
                '<div ng-repeat="image in images" class="item"><img ng-src="{{ image.thumbnails.preview }}" /></div>'+
                '</div>'+
                '<a class="carousel-control left" href="" data-slide="prev">&lsaquo;</a>'+
                '<a class="carousel-control right" href="" data-slide="next">&rsaquo;</a>'+
                '</div>',
            replace: false,
            scope: {
                'images': '=bzCarousel'
            },
            link: function (scope, element, attrs) {
                scope.$watch('images', function(value) {
                    $('.carousel').carousel({
                        interval: 3000
                    })
                });
            }
        };
    });

});
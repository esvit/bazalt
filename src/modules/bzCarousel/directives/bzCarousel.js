define('modules/bzCarousel/directives/bzCarousel', [
    'modules/bzCarousel/app'
], function (app) {

    app.directive('bzCarousel', function () {
        return {
            restrict: 'A',
            template: '<div class="carousel slide" id="slider">'+
                    '<div class="carousel-inner">'+
                    '<div class="item"><img alt="" src="/themes/mixfree/assets/img/poster.jpg"></div>'+
                    '<div class="item active"><img alt="" src="/themes/mixfree/assets/img/poster.jpg"></div>'+
                    '<div class="item"><img alt="" src="/themes/mixfree/assets/img/poster.jpg"></div>'+
                    '</div>'+
                    '<a data-slide="prev" href="#slider" class="carousel-control left">‹</a>'+
                    '<a data-slide="next" href="#slider" class="carousel-control right">›</a>'+
                '</div>',
            replace: true,
            scope: {
                'images': '=bzCarousel'
            },
            link: function (scope, element, attrs) {
                scope.$watch('images', function(value) {
                    $(element).carousel({
                        interval: 3000
                    })
                });
            }
        };
    });

});
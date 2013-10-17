define('modules/bzGalleria/directives/bzGalleria', [
    'modules/bzGalleria/app',

    'jquery-galleria'
], function (app) {
    'use strict';

    app.directive('bzGalleria', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            template: '<div>\
                            <a ng-href="{{ image.url }}" ng-repeat="image in images">\
                                <img ng-src="{{ image.thumbnailUrl }}" \
                                data-big="{{ image.url }}" \
                                data-title="{{ image.title }}" \
                                data-description="{{ image.description }}" />\
                            </a>\
                       </div>',
            replace: true,
            scope: {
                'images': '=bzGalleria'
            },
            link: function (scope, element, attrs) {
                Galleria.addTheme({
                    name: 'classic',
                    author: 'Galleria',
                    //css: '/themes/mixfree/assets/css/galleria.classic.css',
                    defaults: {
                        transition: 'slide',
                        thumbCrop: 'height',
                        _toggleInfo: true
                    },
                    init: function (options) {
                        this.addElement('info-link', 'info-close');
                        this.append({info: ['info-link', 'info-close']});
                        var info = this.$('info-link,info-close,info-text'),
                            touch = Galleria.TOUCH,
                            click = touch ? 'touchstart' : 'click';
                        this.$('loader,counter').show().css('opacity', 0.4);
                        if (!touch) {
                            this.addIdleState(this.get('image-nav-left'), {left: -50});
                            this.addIdleState(this.get('image-nav-right'), {right: -50});
                            this.addIdleState(this.get('counter'), {opacity: 0});
                        }
                        if (options._toggleInfo === true) {
                            info.bind(click, function () {
                                info.toggle();
                            });
                        } else {
                            info.show();
                            this.$('info-link, info-close').hide();
                        }
                        this.bind('thumbnail', function (e) {
                            if (!touch) {
                                $(e.thumbTarget).css('opacity', 0.6).parent().hover(function () {
                                    $(this).not('.active').children().stop().fadeTo(100, 1);
                                }, function () {
                                    $(this).not('.active').children().stop().fadeTo(400, 0.6);
                                });
                                if (e.index === this.getIndex()) {
                                    $(e.thumbTarget).css('opacity', 1);
                                }
                            } else {
                                $(e.thumbTarget).css('opacity', this.getIndex() ? 1 : 0.6)
                            }
                        });
                        this.bind('loadstart', function (e) {
                            if (!e.cached) {
                                this.$('loader').show().fadeTo(200, .4)
                            }
                            this.$('info').toggle(this.hasInfo());
                            $(e.thumbTarget).css('opacity', 1).parent().siblings().children().css('opacity', 0.6);
                        });
                        this.bind('loadfinish', function () {
                            this.$('loader').fadeOut(200);
                        });
                    }
                });

                scope.$watch('images', function (value) {
                    $timeout(function() {
                        element.galleria({
                            height: 600,
                            preload: 1,
                            imageCrop: true,
                            maxScaleRatio: 1,
                            _toggleInfo: false,
                            lightbox: false,
                            extend: function () {
                                this.$('image-nav-left, image-nav-right').animate({opacity: 0.5}, 100);
                                this.$('image-nav-left, image-nav-right').hover(function () {
                                    $(this).css('opacity', 1);
                                }, function () {
                                    $(this).css('opacity', 0.5);
                                });
                            },
                            idleMode: false
                        });
                    }, 100);
                });
            }
        };
    }]);

});
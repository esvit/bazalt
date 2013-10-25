define('modules/bzImg/directives/bzImg', [
    'modules/bzImg/app'
], function (app) {
    'use strict';

    app.directive('bzImg', function () {
        return {
            restrict: 'A',
            template: '<ul class="images thumbnails">' +
                '<li ng-repeat="image in images">'+
                '<a class="thumbnail" ng-href="{{ image.url }}" title="{{ image.title }}" rel="gallery">' +
                '<img ng-src="{{ image.thumbnails.preview }}" />' +
                '</a>'+
                '</li>' +
                '</ul>',
            replace: true,
            scope: {
                'images': '=bzImg'
            },
            link: function (scope, element, attrs) {
                scope.$watch('images', function(value) {
                    $('.thumbnail', element).click(function(e) {
                        e.preventDefault();

                        $(this).trigger('click.fb-start');
                        return false;
                    }).fancybox({
                            helpers:  {
                                title : {
                                    type : 'inside'
                                }
                            }
                        });
                });
            }
        };
    });

});
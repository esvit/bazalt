define('modules/bzMenu/directives/bzMenuDropdown', [
    'modules/bzMenu/app'
], function(app) {
    'use strict';

    app.directive('bzMenuDropdown', function() {
        return {
            restrict: 'A',
            require: '^bzMenu',
            link: function($scope, $element) {
                $element.click(function (e) {
                    if (!$element.hasClass('dropdown-toggle')) {
                        return;
                    }
                    e.preventDefault();
                    var t = $(this).offsetParent('.dropdown-list'),
                        n = t.find('.dropdown-menu');
                    n.slideUp(100);
                    t.hasClass('open') ?
                        (t.removeClass('open'), n.slideUp(100)) :
                        (t.addClass('open'), n.slideDown(100));
                });
            }
        };
    });
});
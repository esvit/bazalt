define('frontend/app', [
    'angular', 'angular-animate', 'angular-route', 'angular-route-segment', 'angular-smoothscroll',

    'modules/bzAuthorization/module',
    'modules/bzConfig/module',
    'modules/bzLanguage/module',
    'modules/bzWidgets/module',
    'modules/bzLoading/module',
    'modules/bzComment/module',
    'modules/bzGalleria/module',
    'modules/bzImg/module',
    'modules/bzCarousel/module',

    'components/bcPages/module',
    'components/bcMenu/module',
    'components/bcUsers/module'
], function (angular) {
    'use strict';

    var modules = ['ngAnimate', 'ngRoute', 'route-segment', 'view-segment', 'angularSmoothscroll'];

    // modules
    modules.push('bzAuthorization');
    modules.push('bzConfig');
    modules.push('bzLanguage');
    modules.push('bzWidgets');
    modules.push('bzLoading');
    modules.push('bzComment');
    modules.push('bzGalleria');
    modules.push('bzImg');
    modules.push('bzCarousel');

    // components
    modules.push('Components.bcPages');
    modules.push('Components.bcMenu');
    modules.push('Components.bcUsers');

    return angular.module('app', modules);
});
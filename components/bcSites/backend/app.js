define('components/bcSites/backend/app', [
    'angular', '../../.',

    'components/bcSites/app',

    'modules/bzList/module'
], function(angular) {
    'use strict';

    return angular.module('Components.bcSites.Backend', ['Components.bcSites', 'ui.select2', 'bzList']);
});
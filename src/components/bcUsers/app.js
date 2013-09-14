define('components/bcUsers/app', [
    'angular', 'angular-resource', 'angular-route-segment', 'ngTable',

    'modules/bzAuthorization/module',

    'modules/bzWidgets/module'
], function(angular) {
    'use strict';

    return angular.module('Components.bcUsers', ['ngResource', 'ngRoute', 'ngTable', 'bzWidgets', 'bzAuthorization']);
});
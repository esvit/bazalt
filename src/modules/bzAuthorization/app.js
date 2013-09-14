define('modules/bzAuthorization/app', [
    'angular', 'bazalt-auth'
], function(angular) {
    'use strict';

    return angular.module('bzAuthorization', ['bazalt-auth']);
});
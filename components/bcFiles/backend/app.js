define('components/bcFiles/backend/app', [
    'angular', 'ngFinder',

    'components/bcFiles/app'
], function(angular) {
    'use strict';

    return angular.module('Components.bcFiles.Backend', ['Components.bcFiles', 'ngFinder']);
});
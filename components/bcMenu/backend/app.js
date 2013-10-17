define('components/bcMenu/backend/app', [
    'angular', '../../.',

    'components/bcMenu/app'
], function(angular) {
    'use strict';

    return angular.module('Components.bcMenu.Backend', ['Components.bcMenu', 'ngEditableTree']);
});
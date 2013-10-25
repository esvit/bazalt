define('components/bcUsers/backend/app', [
    'angular', 'ng-editable-tree', 'bzCommentArea',

    'components/bcUsers/app'
], function(angular) {
    'use strict';

    return angular.module('Components.bcUsers.Backend', ['Components.bcUsers', 'ngEditableTree', 'bzCommentArea']);
});
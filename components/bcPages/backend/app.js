define('components/bcPages/backend/app', [
    'angular', 'ng-editable-tree', 'ng-ckeditor', 'angular-ui-select2',

    'components/bcPages/app'
], function(angular) {
    'use strict';

    return angular.module('Components.bcPages.Backend', ['Components.bcPages', 'ngEditableTree', 'ngCkeditor', 'ui.select2']);
});
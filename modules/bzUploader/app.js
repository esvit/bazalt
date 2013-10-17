define('modules/bzUploader/app', [
    'angular', '../.'
], function(angular) {
    'use strict';

    return angular.module('bzUploader', ['angularFileUpload']);
});
define('modules/bzUploader/app', [
    'angular', 'angular-file-upload'
], function(angular) {
    'use strict';

    return angular.module('bzUploader', ['angularFileUpload']);
});
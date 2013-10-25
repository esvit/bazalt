define('modules/bzUploader/directives/bzUploader', [
    'angular',
    'modules/bzUploader/app'
], function (angular, app) {
    'use strict';

    app.directive('bzUploader', ['bzConfig', function(bzConfig) {
        return {
            restrict: 'A',
            scope: {
                'url': '=bzUploader',
                'files': '=ngModel'
            },
            templateUrl: bzConfig.templateUrl('/modules/bzUploader/views/bzUploader.html'),
            replace: true,
            require: 'ngModel',
            controller: ['$scope', '$fileUploader', '$parse', 'bzConfig', function($scope, $fileUploader, $parse, bzConfig) {

                // create a uploader with options
                var uploader = $fileUploader.create({
                    scope: $scope,                          // to automatically update the html. Default: $rootScope
                    url: bzConfig.resource($scope.url).replace('\\:', ':'),
                    filters: [
                        function (item) {                    // first user filter
                            //console.log('filter1', item);
                            return true;
                        }
                    ]
                });

                // ADDING FILTER

                uploader.filters.push(function (item) { // second user filter
                    //console.log('filter2');
                    return true;
                });

                // REGISTER HANDLERS

                uploader.bind('afteraddingfile', function (event, item) {
                    //item.upload();
                    //console.log('After adding a file', item);
                });

                uploader.bind('afteraddingall', function (event, items) {
                    uploader.uploadAll();
                    //console.log('After adding all files', items);
                });

                uploader.bind('changedqueue', function (event, items) {
                    ///console.log('Changed queue', items);
                });

                uploader.bind('beforeupload', function (event, item) {
                    //console.log('Before upload', item);
                });

                uploader.bind('progress', function (event, item, progress) {
                    //console.log('Progress: ' + progress);
                });

                uploader.bind('success', function (event, xhr, item) {
                    var response = $parse(xhr.response)();
                    $scope.files = $scope.files || [];
                    $scope.files.push(response);

                    angular.forEach(uploader.queue, function(file, n) {
                        if (file == item) {
                            uploader.queue.splice(n, 1);
                        }
                    });
                    //console.log('Success: ', response);
                });

                uploader.bind('complete', function (event, xhr, item) {
                    //console.log('Complete: ' + xhr.response);
                    item.progress = 100;
                });

                uploader.bind('progressall', function (event, progress) {
                    //console.log('Total progress: ' + progress);
                });

                uploader.bind('completeall', function (event, items) {
                   // console.log('All files are transferred');
                    uploader.progress = 100;
                });

                $scope.deleteFiles = function() {
                    $scope.files = [];
                };
                $scope.deleteFile = function(file) {
                    angular.forEach($scope.files, function(item, i){
                        if (item == file) {
                            $scope.files.splice(i, 1);
                            console.info(file);
                        }
                    });
                };
                $scope.uploader = uploader;
            }]
        };
    }]);

});
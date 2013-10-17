define('components/bcSites/backend/controllers/SiteEdit', [
    'angular',

    'components/bcSites/app',

    'components/bcSites/factories/Repository'
], function (angular, app) {
    'use strict';

    app.controller('bcSites.Controllers.SiteEdit',
        ['$scope', '$filter', '$timeout', '$location', '$routeSegment', 'bcSites.Factories.Site', 'bcSites.Factories.Repository',
            function ($scope, $filter, $timeout, $location, $routeSegment, SiteResource, RepositoryResource) {
                //bzList($scope, 'list1', SiteResource);

                $scope.loading = {
                    repository: false,
                    site: false
                };
                if ($routeSegment.$routeParams.id) {
                    $scope.loading.site = true;
                    SiteResource.get({ 'id': $routeSegment.$routeParams.id }, function (site) {
                        $scope.loading.site = false;
                        // set new data
                        $scope.item = site;

                        $scope.loadRepositoryData(site.id);
                    });
                } else {
                    $scope.item = new SiteResource({ images: [], tags: [] });
                }

                $scope.saveItem = function (item) {
                    $scope.loading.site = true;
                    item.$save(function () {
                        $location.path('/sites');
                    }, function (res) {
                        $scope.loading.site = false;
                        if (res.status == 400) {
                            console.info(res.data);
                        }
                    });
                };

                $scope.loadRepositoryData = function(id) {

                    RepositoryResource.get({ 'id': id }, function(repository) {
                        $scope.loading.repository = false;
                        repository.id = $scope.item.id;
                        $scope.repository = repository;
                        $scope.repositoryUrl = repository.repository;
                    }, function(res) {
                        $scope.loading.repository = false;
                        if (res.status == 400) {
                            console.info(res.data);
                        }
                    });
                };

                $scope.updateRepository = function (repository) {
                    $scope.loading.repository = true;
                    RepositoryResource.update({ 'id': $scope.item.id }, function(res) {
                        $scope.loading.repository = false;
                        $scope.loadRepositoryData($scope.item.id);
                    }, function (res) {
                        $scope.loading.repository = false;
                        alert(res.data);
                    });
                };

                $scope.createRepository = function (repositoryUrl) {
                    $scope.loading.repository = true;
                    RepositoryResource.create({ 'id': $scope.item.id }, { 'repository': repositoryUrl }, function(res) {
                        $scope.loadRepositoryData($scope.item.id);
                    }, function (res) {
                        $scope.loading.repository = false;
                        alert(res.data);
                    });
                };
            }]);

});
define('components/bcPages/backend/controllers/PageEdit', [
    'angular',

    'components/bcPages/app',

    'speakingurl'
], function (angular, app, getSlug) {
    'use strict';

    app.controller('bcPages.Controllers.PageEdit',
        ['$scope', '$filter', '$timeout', '$location', '$routeSegment', 'bcPages.Factories.Page',
            'bcPages.Factories.Category', 'bcPages.Factories.Tag',
            function ($scope, $filter, $timeout, $location, $routeSegment, PageResource, CategoryResource, TagsResource) {
                $scope.loading = {
                    categories: false,
                    page: false
                };
                if ($routeSegment.$routeParams.id) {
                    $scope.loading.page = true;
                    PageResource.get({ 'id': $routeSegment.$routeParams.id }, function (page) {
                        $scope.loading.page = false;
                        // set new data
                        $scope.item = page;
                    });
                } else {
                    $scope.item = new PageResource({ images: [], tags: [] });
                }

                $scope.loading.categories = true;
                CategoryResource.get(function (data) {
                    $scope.loading.categories = false;

                    var items = [];

                    function walk(item, level) {
                        // 2 space per level
                        if (level > 0) { // without root item
                            item.prefix = new Array((level - 1) * 2 + 1).join(String.fromCharCode(160));
                            if (level > 1) { // only for childrens
                                item.prefix += '» ';
                            }
                            items.push(item);
                        }
                        for (var i = 0; i < item.children.length; i++) {
                            walk(item.children[i], level + 1);
                        }
                    }

                    walk(data, 0);
                    $scope.categories = items;
                });

                $scope.saveItem = function (item) {
                    $scope.loading.page = true;
                    $scope.loading.categories = true;
                    item.$save(function () {
                        $location.path('/pages');
                    }, function (res) {
                        $scope.loading.page = false;
                        $scope.loading.categories = false;
                        if (res.status == 400) {
                            $scope.itemEdit.invalidForm(res.data);
                            $timeout(function () {
                                var el = $('.has-error:first');
                                $.scrollTo(el);
                            }, 100);
                        }
                    });
                };

                $scope.tagsOptions = {
                    tokenSeparators: [','],
                    tags: true,
                    formatResult: function (item) {
                        if (!item.id) {
                            return '<strong>' + item.title + '</strong>';
                        }
                        return item.title;
                    },
                    formatSelection: function (item) {
                        return item.title;
                    },
                    query: function (query) {
                        TagsResource.get({ 'q': query.term }, function (result) {
                            query.callback({ results: result.data });
                        });
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    },
                    createSearchChoice: function(term, data) {
                        if ($(data).filter(function () {
                            return this.title.toLowerCase().localeCompare(term.toLowerCase()) === 0;
                        }).length === 0) {
                            return {
                                id: term,
                                title: term,
                                url: getSlug(term),
                                isNew: true
                            };
                        }
                        return null;
                    }
                };
            }]);

});
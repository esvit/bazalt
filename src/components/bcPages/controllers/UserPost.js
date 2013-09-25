define('components/bcPages/controllers/UserPost', [
    'components/bcPages/app'
], function(app) {
    'use strict';

    app.controller('bcPages.Controllers.UserPost',
        ['$scope', '$filter', '$timeout', '$location', '$routeSegment', 'bcPages.Factories.Page',
            function ($scope, $filter, $timeout, $location, $routeSegment, PageResource) {
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
                    $scope.item = new PageResource({
                        is_published: true,
                        category_id: 6,
                        is_allow_comments: true,
                        images: [], tags: []
                    });
                }

                $scope.saveItem = function (item) {
                    $scope.loading.page = true;
                    $scope.loading.categories = true;
                    item.$save(function (page) {
                        $location.path(page.url);
                        window.scrollTo(0,0);
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

            }]);

});

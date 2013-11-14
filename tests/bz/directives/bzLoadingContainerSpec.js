define(['angular', 'angular-mocks', 'bz/filters/language'], function (angular) {

    describe('bzLoadingContainer', function () {
        var elm, $scope;

        beforeEach(module('bz'));

        beforeEach(inject(function($rootScope, $compile) {
            $scope = $rootScope.$new();
            $scope.loading = false;
            elm = angular.element('<div bz-loading-container="loading"></div>');
            $compile(elm)($scope);
        }));

        it('should add class when loading', function() {
            var div = elm.find('div');
            expect(div.length).toBe(1);
            expect(div.hasClass('bz-loading')).toBe(true);
            expect(div.hasClass('ng-hide')).toBe(true);
            expect(elm.hasClass('bz-loading-container')).toBe(true);
            $scope.loading = true;
            $scope.$apply();
            expect(div.hasClass('ng-hide')).toBe(false);
        });
    });

});
define(['angular', 'angular-mocks', 'bazalt-cms/factories/pages/page'], function (angular) {

    describe('bazalt.pages.page', function () {
        var httpBackend, scope;
        beforeEach(module('bazalt-cms'));
        beforeEach(inject(function($httpBackend, $rootScope){
            httpBackend = $httpBackend;
            $httpBackend.whenGET('/api/pages').respond({
                data: []
            });
            scope = $rootScope.$new();
        }));
        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('should be defined', inject(['bazalt.pages.page', function (PageResource) {
            var pagesData = PageResource.get();
            httpBackend.expectGET('/api/pages');
            scope.$apply();
            httpBackend.flush();
            expect(pagesData.data).toEqual([]);
        }]));
    });

});
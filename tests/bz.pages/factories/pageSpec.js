define(['angular', 'angular-mocks', 'bz.pages/factories/page'], function (angular) {

    describe('bz.pages.factories.page', function () {
        var httpBackend, scope;
        beforeEach(module('bz.pages'));
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

        it('should be defined', inject(['bz.pages.factories.page', function (PageResource) {
            var pagesData = PageResource.get();
            httpBackend.expectGET('/api/pages');
            scope.$apply();
            httpBackend.flush();
            expect(pagesData.data).toEqual([]);
        }]));
    });

});
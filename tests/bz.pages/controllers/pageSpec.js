define(['angular', 'angular-mocks', 'bz.pages/controllers/page'], function (angular) {

    describe('bz.pages.controllers.page', function () {
        var scope, createController, httpBackend, routeSegment;
        beforeEach(module('bz.pages'));
        beforeEach(inject(['$controller', '$rootScope', 'bz.pages.factories.page', '$httpBackend', '$routeSegment',
            function($controller, $rootScope, pageResource, $httpBackend, $routeSegment){
            scope = $rootScope.$new();
            httpBackend = $httpBackend;
            routeSegment = $routeSegment;
            httpBackend.whenGET('/api/pages/1').respond(200, {
                title: 'Test'
            });
            httpBackend.whenGET('/api/pages/2').respond(404, { 'id': 'Page not found' });
            httpBackend.whenPUT('/api/pages?action=view').respond(200);

            createController = function() {
                return $controller('bz.pages.controllers.page', { $scope: scope });
            };
        }]));
        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('open page', inject(function () {
            routeSegment.$routeParams = { id: '1' };
            createController();
            expect(scope.loading).toEqual(true);

            httpBackend.expectGET('/api/pages/1');
            httpBackend.expectPUT('/api/pages?action=view').respond(200);
            scope.$apply();
            httpBackend.flush();

            expect(scope.loading).toEqual(false);
            expect(scope.page.title).toEqual('Test');
        }));

        it('page not found', inject(function () {
            routeSegment.$routeParams = { id: '2' };
            createController();
            expect(scope.loading).toEqual(true);

            httpBackend.expectGET('/api/pages/2').respond(404, { 'id': 'Page not found' });
            scope.$apply();
            httpBackend.flush();

            expect(scope.page.template).toEqual('/views/pages/404.html');
            expect(scope.loading).toEqual(false);
        }));
    });

});
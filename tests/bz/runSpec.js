define(['angular', 'bz/run'], function(angular, app) {

    describe('bazalt-cms app run', function () {
        beforeEach(module('bz'));

        it("normal location", inject(['$rootScope', '$location', function($rootScope, $location) {
            $rootScope.$on('$locationChangeStart', function(e, url) {
                expect(url).toEqual('http://server/#/test');
            });
            $location.path('/test');
            $rootScope.$apply();
        }]));

        it("change location for language", inject(['$rootScope', '$location', '$route', function($rootScope, $location, $route) {
            $rootScope.$on('$locationChangeStart', function(e, url) {
                expect(url).toEqual('http://server/#/en/test');
            });
            spyOn($route, 'reload');
            $location.path('/en/test');
            spyOn($location, 'path');
            $rootScope.$apply();
            expect($location.path).toHaveBeenCalledWith('/test');
            expect($route.reload).toHaveBeenCalled();

            $rootScope.$on('$locationChangeSuccess', function(e, url) {
                expect(url).toEqual('http://server/#/test123123122');
            });
            $rootScope.$apply();
        }]));

        it("for unknown language", inject(['$rootScope', '$location', function($rootScope, $location) {
            $rootScope.$on('$locationChangeStart', function(e, url) {
                expect(url).toEqual('http://server/#/uk/test');
            });
            $location.path('/uk/test');
            $rootScope.$apply();
        }]));
    });

});

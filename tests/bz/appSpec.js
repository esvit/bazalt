define(['angular', 'bz/app'], function(angular, app) {

    describe('bazalt-cms app', function () {
        var module, dependencies;

        beforeEach(function () {
            module = angular.module('bz');
            dependencies = module.requires;
        });

        it("should be registered", function() {
            expect(module).not.toBeUndefined();
        });

        describe("Dependencies:", function() {
            var hasModule = function(module) {
                return dependencies.indexOf(module) >= 0;
            };

            it("should have ngResource as a dependency", function() {
                expect(hasModule('ngResource')).toEqual(true);
            });

            it("should have ngCookies as a dependency", function() {
                expect(hasModule('ngCookies')).toEqual(true);
            });

            it("should have ngRoute as a dependency", function() {
                expect(hasModule('ngRoute')).toEqual(true);
            });

            it("should have ngLocale as a dependency", function() {
                expect(hasModule('ngLocale')).toEqual(true);
            });

            it("should have route-segment as a dependency", function() {
                expect(hasModule('route-segment')).toEqual(true);
            });

            it("should have view-segment as a dependency", function() {
                expect(hasModule('view-segment')).toEqual(true);
            });
        });
    });

});

define(['angular', 'angular-mocks', 'bz/providers/bzConfig'], function (angular) {

    describe('bzConfig', function () {
        var provider;

        window.bazalt = { 'api': '/api' };

        beforeEach(module('bz', ['$injector', function($injector) {
            provider = $injector.get('bzConfigProvider');
        }]));

        it('should be defined', inject(['bzConfig', function (config) {
            expect(config).toBeDefined();
        }]));

        it('load from global object', inject(['bzConfig', function (config) {
            expect(config.api()).toEqual('/api');
        }]));

        it('option mine', inject(['bzConfig', function (config) {
            provider.api('/api');

            expect(config.api()).toEqual('/api');
        }]));

        it('option resource', inject(['bzConfig', function (config) {
            provider.api('/api');

            expect(config.resource('/test')).toEqual('/api/test');
        }]));

        it('option templatePrefix', inject(['bzConfig', function (config) {
            provider.templatePrefix('/api');

            expect(config.templatePrefix()).toEqual('/api');
        }]));

        it('option templateUrl', inject(['bzConfig', function (config) {
            provider.templatePrefix('/api');

            expect(config.templateUrl('/test')()).toEqual('/api/test');
        }]));

        it('option languages', inject(['bzConfig', function (config) {
            expect(config.languages()).toEqual(['en']);

            provider.languages(['en', 'uk']);

            expect(config.languages()).toEqual(['en', 'uk']);
        }]));
    });

});
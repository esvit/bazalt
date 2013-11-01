define(['angular', 'angular-mocks', 'bazalt-cms/providers/config'], function (angular) {

    describe('bazalt.config', function () {
        var provider;

        window.bazalt = { 'api': '/api' };

        beforeEach(module('bazalt-cms', ['$injector', function($injector) {
            provider = $injector.get('bazalt.configProvider');
        }]));

        it('should be defined', inject(['bazalt.config', function (config) {
            expect(config).toBeDefined();
        }]));

        it('load from global object', inject(['bazalt.config', function (config) {
            expect(config.api()).toEqual('/api');
        }]));

        it('option mine', inject(['bazalt.config', function (config) {
            provider.api('/api');

            expect(config.api()).toEqual('/api');
        }]));

        it('option resource', inject(['bazalt.config', function (config) {
            provider.api('/api');

            expect(config.resource('/test')).toEqual('/api/test');
        }]));

        it('option templatePrefix', inject(['bazalt.config', function (config) {
            provider.templatePrefix('/api');

            expect(config.templatePrefix()).toEqual('/api');
        }]));

        it('option templateUrl', inject(['bazalt.config', function (config) {
            provider.templatePrefix('/api');

            expect(config.templateUrl('/test')()).toEqual('/api/test');
        }]));

        it('option languages', inject(['bazalt.config', function (config) {
            expect(config.languages()).toEqual(['en']);

            provider.languages(['en', 'uk']);

            expect(config.languages()).toEqual(['en', 'uk']);
        }]));
    });

});
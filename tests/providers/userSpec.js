define(['angular', 'angular-mocks', 'bazalt-cms/providers/bzUser'], function (angular) {

    describe('bzLanguage', function () {
        var provider, config;

        beforeEach(module('bazalt-cms', ['$injector', function($injector) {
            provider = $injector.get('bzLanguageProvider');
            config = $injector.get('bzConfigProvider');
            config.languages(['en', 'uk']);
        }]));

        afterEach(function() {
            config.languages(['en']);
        });

        it('should be defined', inject(['bzLanguage', function (lang) {
            expect(lang).toBeDefined();
        }]));
    });

});
define(['angular', 'angular-mocks', 'bazalt-cms/providers/bzUser'], function (angular) {

    describe('bazalt.language', function () {
        var provider, config;

        beforeEach(module('bazalt-cms', ['$injector', function($injector) {
            provider = $injector.get('bazalt.languageProvider');
            config = $injector.get('bazalt.configProvider');
            config.languages(['en', 'uk']);
        }]));

        afterEach(function() {
            config.languages(['en']);
        });

        it('should be defined', inject(['bazalt.language', function (lang) {
            expect(lang).toBeDefined();
        }]));
    });

});
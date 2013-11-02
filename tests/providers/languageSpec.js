define(['angular', 'angular-mocks', 'bazalt-cms/providers/bzLanguage'], function (angular) {

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

        it('option language', inject(['bzLanguage', function (lang) {
            expect(lang.id()).toEqual('en');

            provider.id('uk');

            expect(lang.id()).toEqual('uk');
        }]));

        it('change language events', inject(['bzLanguage', '$rootScope', function (lang, $rootScope) {
            $rootScope.$on('$languageChangeStart', function(e, newLang, oldLang) {
                expect(oldLang).toEqual('en');
                expect(newLang).toEqual('uk');
            });
            $rootScope.$on('$languageChangeSuccess', function(e, newLang) {
                expect(newLang).toEqual('uk');
            });

            lang.id('uk');

            expect(function () {
                lang.id('ru');
            }).toThrow(new Error('Language "ru" not allowed'));
        }]));
    });

});
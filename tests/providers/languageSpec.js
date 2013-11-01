define(['angular', 'angular-mocks', 'bazalt-cms/providers/language'], function (angular) {

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

        it('option language', inject(['bazalt.language', function (lang) {
            expect(lang.id()).toEqual('en');

            provider.id('uk');

            expect(lang.id()).toEqual('uk');
        }]));

        it('change language events', inject(['bazalt.language', '$rootScope', function (lang, $rootScope) {
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
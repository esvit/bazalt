define(['angular', 'angular-mocks', 'bazalt-cms/filters/language'], function (angular) {

    describe('filter language', function () {
        beforeEach(module('bazalt-cms'));

        it('should be show current language', inject(['languageFilter', function (language) {
            expect(language({ 'en': 'Test' })).toEqual('Test');

            expect(language({ 'ru': 'Test', 'orig': 'ru' })).toEqual('Test (ru)');

            expect(language({ 'ru': 'Test' })).toEqual({ 'ru': 'Test' });

            expect(language('Test')).toEqual('Test');
        }]));
    });

});
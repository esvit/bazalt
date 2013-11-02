define(['angular', 'angular-mocks', 'bazalt-cms/providers/bzUser'], function (angular) {

    describe('bzUser checkSessionOnStart', function () {
        var provider, config, httpBackend;

        beforeEach(module('bazalt-cms', ['$injector', function($injector) {
            provider = $injector.get('bzUserProvider');
            config = $injector.get('bzConfigProvider');
            config.checkSessionOnStart(true);
        }]));

        it('should be defined and session check', inject(['bzUser', '$rootScope', '$httpBackend', function ($user, $rootScope, $httpBackend) {
            expect($user).toBeDefined();

            $httpBackend.whenPUT('/api/auth/session').respond(200, { 'is_guest': true, 'guest_id': '1' });
            $httpBackend.expectPUT('/api/auth/session');

            $rootScope.$apply();

            $httpBackend.flush();

            expect($user.is_guest).toEqual(true);
            expect($user.guest_id).toEqual('1');
        }]));
    });

    describe('bzUser', function () {
        var provider, config;

        beforeEach(module('bazalt-cms', ['$injector', function($injector) {
            provider = $injector.get('bzUserProvider');
            config = $injector.get('bzConfigProvider');
            config.checkSessionOnStart(false);
        }]));

        afterEach(function() {
            config.languages(['en']);
        });

        it('should be defined', inject(['bzUser', '$rootScope', function ($user, $rootScope) {
            expect($user).toBeDefined();

            $rootScope.$apply();
        }]));
    });

});
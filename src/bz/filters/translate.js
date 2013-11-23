define(['bz/app'], function(app) {

    app.filter('translate', ['$rootScope', function($rootScope) {
        return function(string) {
            var translateBundle = $rootScope.$localeBundle || {};
            return string;
        };
    }]);

});
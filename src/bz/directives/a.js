define([
    'bz/app'
], function(app) {

    // @todo write test
    app.directive('a', ['bzLanguage', '$location', function(bzLanguage, $location) {
        return {
            restrict: 'E',
            compile: function(element, attr) {
                return function(scope, element, attr) {
                    if (!attr.href || angular.isDefined(attr.bzLangIgnore)) {
                        return;
                    }
                    // change link href for current language
                    scope.$on('$languageChangeSuccess', function(e, newLang, oldLang) {
                        var old = '/' + oldLang + '/',
                            url = attr.href;
                        if (url.indexOf(old) != -1) {
                            url = url.replace(old, '/' + newLang + '/');
                            attr.$set('href', url);
                        }
                    });
                };
            }
        };
    }]);

    return app;
});
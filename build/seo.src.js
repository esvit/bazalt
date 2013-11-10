(function () {
define('bz.seo/app',[
    'angular', 'bz'
], function(angular) {
    'use strict';

    return angular.module('bz.seo', ['bz']);
});
define('bz.seo/factories/route',[
    'bz.seo/app'
], function(app) {
    'use strict';

    app.factory('bz.seo.factories.route', ['$resource', 'bzConfig', function ($resource, config) {
        var service = $resource(config.resource('/seo/routes/'), {}, {
        });

        return service;
    }]);

});
define('bz/seo',[
    'bz.seo/app',

    'bz.seo/factories/route'
], function (app) {

    app.config([function() {
        // http://prerender.io/
        window.prerenderReady = false;
    }]);

    app.run(['$rootScope', '$location', '$route', 'bz.seo.factories.route', '$rootElement',
        function ($rootScope, $location, $route, RouteFactory, $rootElement) {

            var head = $rootElement.find('head');
            if (!head.length) {
                title = angular.element(document.createElement('title'));
                $rootElement.find('head').append(metaKeywords);
            }
            var title = angular.element(head.find('title')[0])
            metaKeywords = angular.element(head.find('meta[name=keywords]')[0]),
                metaDesc = angular.element(head.find('meta[name=description]')[0]);


            // create description meta tag if it not exists
            if (!metaDesc.length) {
                metaDesc = angular.element(document.createElement('meta'))
                    .attr('name', 'description')
                    .attr('content', '');
                $rootElement.find('head').prepend(metaDesc);
            }
            // create keyword meta tag if it not exists
            if (!metaKeywords.length) {
                metaKeywords = angular.element(document.createElement('meta'))
                    .attr('name', 'keywords')
                    .attr('content', '');
                $rootElement.find('head').prepend(metaKeywords);
            }

            // create title tag if it not exists
            if (!title.length) {
                title = angular.element(document.createElement('title'));
                $rootElement.find('head').prepend(title);
            }

            var currentRoute = null;
            $rootScope.$on('$routeChangeSuccess', function (e) {
                window.prerenderReady = true;

                var route = { 'url': $location.path(), 'route': $route.current.$$route.segment };
                if (!angular.equals(route, currentRoute)) { // disable double request
                    currentRoute = route;
                    RouteFactory.get(route, function (res) {
                        $rootScope.$meta = res;
                        title.html(res.title || '');
                        metaKeywords.attr('content', res.keywords || '');
                        metaDesc.attr('content', res.description || '');
                    });
                }
            });


        }]);

    return app;
});}());
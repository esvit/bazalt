requirejs.config({
    packages: [{
        name: 'bz',
        location: 'bz',
        main: 'run'
    }],
    paths: {
        // angular
        'angular': '../bower_components/angular/angular',
        'angular-resource': '../bower_components/angular-resource/angular-resource',
        'angular-route': '../bower_components/angular-route/angular-route',
        'angular-cookies': '../bower_components/angular-cookies/angular-cookies',
        'angular-route-segment': '../bower_components/angular-route-segment/build/angular-route-segment',

        // tests
        'jasmine': '../bower_components/jasmine/lib/jasmine-core'
    },
    shim: {
        'angular': { exports: 'angular' },
        'angular-resource': { deps: ['angular'] },
        'angular-route': { deps: ['angular'] },
        'angular-cookies': { deps: ['angular'] },
        'angular-route-segment': { deps: ['angular', 'angular-route'] }
    },
    priority: [
        'angular'
    ],
    urlArgs: 'v=1.1'
});
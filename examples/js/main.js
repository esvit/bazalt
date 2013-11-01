require.config({
    baseUrl: '/src',
    context: 'bazalt-cms'
});
require.config({
    baseUrl: './js',

    packages: [{
        name: 'bazalt-cms',
        location: '../../',
        main: 'bazalt-cms.src'
    }],

    paths: {
        'angular': '../../bower_components/angular/angular'
    },

    shim: {
        'angular': { exports: 'angular' },
        'http://code.angularjs.org/1.2.0-rc.3/i18n/angular-locale_uk-ua.js': { deps: ['angular'] }
    }
});
require(['app']);
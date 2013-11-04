require.config({
    baseUrl: './js',

    packages: [{
        name: 'bz',
        location: '../../build',
        main: 'bz'
    }],

    paths: {
        'angular': '../../bower_components/angular/angular',
        'angular-locale': 'http://code.angularjs.org/1.2.0-rc.3/i18n/angular-locale_uk-ua'
    },

    shim: {
        'angular': { exports: 'angular' },
        'angular-locale': { deps: ['angular'] }
    }
});
require(['app']);
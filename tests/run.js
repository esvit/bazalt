var allTestFiles = ['angular-mocks', 'bz'];
var TEST_REGEXP = /^\/base\/tests(.*)Spec\.js$/;

Object.keys(window.__karma__.files).forEach(function(file) {
    if (TEST_REGEXP.test(file)) {
        allTestFiles.push(file);
    }
});

require.config({
    urlArgs: '' + Math.random(),

    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: '/base/src',

    packages: [{
        name: 'bz',
        location: './bz',
        main: '../config'
    }],

    paths: {
        'angular': '../bower_components/angular/angular',
        'angular-mocks': '../bower_components/angular-mocks/angular-mocks'
    },

    shim: {
        'angular': { exports: 'angular' },
        'angular-mocks': { deps: ['angular'], exports: 'mocks' }
    },

    // dynamically load all test files
    deps: allTestFiles,

    // we have to kickoff jasmine, as it is asynchronous
    callback: window.__karma__.start
});
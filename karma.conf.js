// Karma configuration file
// See http://karma-runner.github.io/0.10/config/configuration-file.html
module.exports = function (config) {
    config.set({
        basePath: '',

        frameworks: ['jasmine', 'requirejs'],

        // list of files / patterns to load in the browser
        files: [
            // libraries
            {pattern: 'bower_components/**/*.js', included: false, watch: false },

            // directive
            {pattern: 'src/**/*.js', included: false},

            // tests
            {pattern: 'tests/config.js', included: true},

            {pattern: 'tests/**/*.js', included: false}
        ],

        // generate js files from html templates
        preprocessors: {
            'src/**/*.js': 'coverage'
        },

        reporters: ['progress', 'coverage'],

        autoWatch: true,
        //browsers: ['PhantomJS'],
        browsers: ['Chrome'],
        coverageReporter: {
            type: 'lcov',
            dir: 'out/coverage'
        }
    });
};

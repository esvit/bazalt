var path = require('path');

module.exports = function(grunt) {

    grunt.initConfig({
        requirejs: {
            cms: {
                options: {
                    name: 'bz/run',
                    exclude: ['angular', 'angular-resource', 'angular-route', 'angular-cookies', 'angular-route-segment'],
                    out: 'build/bz-lite.src.js'
                }
            },
            cmsFull: {
                options: {
                    name: 'bz/run',
                    out: 'build/bz.src.js'
                }
            },
            options: {
                baseUrl: 'src',
                optimize: 'none',
                preserveLicenseComments: false,
                useStrict: true,
                wrap: true,
                mainConfigFile: 'src/config.js',
                onBuildWrite: function(moduleName, path, contents) {
                    return contents.replace(/define\('bz\/run'/g, "define('bz'")
                                   .replace(/define\('bz.(.*)\/run'/g, "define('bz/$1'");
                }
            }
        },
        uglify: {
            cms: {
                src: ['build/bz-lite.src.js'],
                dest: 'build/bz-lite.js'
            },
            cmsFull: {
                src: ['bower_components/requirejs/require.js', 'build/bz.src.js'],
                dest: 'build/bz.js'
            },
            options: {
                compress: true,
                mangle: true,
                preserveComments: false,
                sourceMapPrefix: 1,
                sourceMappingURL: function(fileName) {
                    return fileName.replace(/^build\//, '')
                                   .replace(/\.js$/, '.map');
                },
                sourceMap: function(fileName) {
                    return fileName.replace(/\.js$/, '.map');
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('default', [
        'requirejs',
        'uglify'
    ]);
};
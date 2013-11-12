path = require 'path'

module.exports = (grunt) ->
  grunt.initConfig

    requirejs:
        cms:
            options:
                name: 'bz/run'
                exclude: ['angular', 'angular-resource', 'angular-route', 'angular-cookies', 'angular-route-segment']
                out: 'build/bz.src.js'
        cmsFull:
            options:
                name: 'bz/run'
                out: 'build/bz.full.js'
        'bz.pages':
            options:
                name: 'bz.pages/run'
                exclude: ['angular', 'bz', 'ngTable', 'bz-nested-model']
                out: 'build/pages.src.js'
        'bz.menu':
            options:
                name: 'bz.menu/run'
                exclude: ['angular', 'bz', 'bz-nested-model']
                out: 'build/menu.src.js'
        'bz.seo':
            options:
                name: 'bz.seo/run'
                exclude: ['angular', 'bz']
                out: 'build/seo.src.js'
        options:
            baseUrl: 'src'
            optimize: 'none'
            preserveLicenseComments: false
            useStrict: true
            wrap: true
            mainConfigFile: 'src/config.js'
            onBuildWrite: (moduleName, path, contents) ->
                contents.replace(/define\('bz\/run'/g, "define('bz'")
                        .replace(/define\('bz.(.*)\/run'/g, "define('bz/$1'")

    uglify:
        cms:
            src: ['build/bz.src.js']
            dest: 'build/bz.lite.js'
        cmsFull:
            src: ['bower_components/requirejs/require.js', 'build/bz.full.js']
            dest: 'build/bz.js'
        'bz.pages':
            src: ['build/pages.src.js']
            dest: 'build/pages.js'
        'bz.menu':
            src: ['build/menu.src.js']
            dest: 'build/menu.js'
        'bz.seo':
            src: ['build/seo.src.js']
            dest: 'build/seo.js'

        options:
            compress: true
            mangle: true
            preserveComments: false
            sourceMapPrefix: 1
            sourceMappingURL: (fileName) ->
                fileName.replace(/^build\//, '')
                        .replace(/\.js$/, '.map')
            sourceMap: (fileName) ->
                fileName.replace(/\.js$/, '.map')

    htmlmin:
        backend:
            files:
                'build/admin/index.html': 'src/backend/views/index.html'
            options:
                removeComments: true
                removeRedundantAttributes: true
                useShortDoctype: true
                removeOptionalTags: true
                collapseWhitespace: true

    replace:
        backend:
            src: 'build/admin/index.html'
            overwrite: true
            replacements: [{
                from: /<script>(.|[\r\n])*<\/script>/gm
                to: "<script>require(['backend/main']);</script>"
            }, {
                from: '<script src="/src/require.js"></script>'
                to: ''
            }]

    less:
        backend:
            src: 'src/backend/assets/css/app.less'
            dest: 'build/admin/assets/css/app.css'

    copy:
        backend:
            files: [
                expand: true
                cwd: 'src/backend/assets/'
                src: '**'
                dest: 'build/admin/assets/'
            ]

    i18nextract:
        backend:
            lang: ['en_GB', 'ru_RU']
            src: ['src/backend/**/*.html']
            dest: 'src/backend/locale'
            safeMode: true
        bcPages:
            lang: ['en_GB', 'ru_RU']
            src: ['src/components/bcPages/backend/**/*.html']
            dest: 'src/components/bcPages/backend/locale'
            safeMode: true

    grunt.loadNpmTasks 'grunt-contrib-htmlmin'
    grunt.loadNpmTasks 'grunt-text-replace'
    grunt.loadNpmTasks 'grunt-contrib-copy'
    grunt.loadNpmTasks 'grunt-contrib-less'
    grunt.loadNpmTasks 'grunt-contrib-uglify'
    grunt.loadNpmTasks 'grunt-contrib-requirejs'
    grunt.loadNpmTasks 'grunt-angular-translate'

    grunt.registerTask 'default', [
        'requirejs'
        'uglify'
    ]

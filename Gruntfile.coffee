path = require 'path'

module.exports = (grunt) ->
  grunt.initConfig

    requirejs:
        frontend:
            options:
                baseUrl: 'src'
                optimize: 'none'
                preserveLicenseComments: false
                useStrict: true
                wrap: true
                mainConfigFile: 'src/config.js'
                name: 'frontend/main'
                #include: ['bazalt-auth']
                #exclude: ['jquery','angular','angular-resource','angular-cookies']
                out: 'build/frontend.src.js'

        backend:
            options:
                baseUrl: 'src'
                optimize: 'none'
                preserveLicenseComments: false
                useStrict: true
                wrap: true
                mainConfigFile: 'src/config.js'
                name: 'backend/main'
                #include: ['bazalt-auth']
                #exclude: ['jquery','angular','angular-resource','angular-cookies']
                out: 'build/backend.src.js'

    uglify:
        frontend:
            src: ['bower_components/requirejs/require.js', 'build/frontend.src.js']
            dest: 'build/frontend.js'

        backend:
            src: ['bower_components/requirejs/require.js', 'build/backend.src.js']
            dest: 'build/backend.js'

        options:
            compress: true
            mangle: true
            preserveComments: false
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

    grunt.registerTask 'frontend', [
        'requirejs:frontend'
        'uglify:frontend'
    ]
    grunt.registerTask 'backend', [
        'htmlmin:backend'
        'less:backend'
        'replace:backend'
        'requirejs:backend'
        'uglify:backend'
    ]
    grunt.registerTask 'default', [
        'frontend'
        'backend'
    ]

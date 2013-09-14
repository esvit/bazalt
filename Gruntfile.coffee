path = require 'path'

# Build configurations.
module.exports = (grunt) ->
  grunt.initConfig
  # Deletes built file and temp directories.
    clean:
      working:
        src: [
          'bazalt-auth.*'
        ]

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
          out: 'dist/frontend/main.src.js'

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
          out: 'dist/backend/main.src.js'

    uglify:
      requirejs:
        src: ['bower_components/requirejs/require.js']
        dest: 'dist/require.js'

      frontend:
        src: ['bower_components/requirejs/require.js', 'dist/frontend/main.src.js']
        dest: 'dist/frontend/main.js'
        options:
          compress: true
          mangle: true
          preserveComments: false
          sourceMappingURL: (fileName) ->
            fileName.replace /^dist\/frontend\//, ''
          sourceMap: (fileName) ->
            fileName.replace /\.js$/, '.map'

      backend:
        src: ['dist/backend/main.src.js']
        dest: 'dist/backend/main.js'
        options:
          sourceMappingURL: (fileName) ->
            fileName.replace /^dist\/backend\//, ''
          sourceMap: (fileName) ->
            fileName.replace /\.js$/, '.map'

    htmlmin:
      frontend:
        files:
          'dist/index.html': 'dist/index.html'
      options:
        removeComments: true
        removeRedundantAttributes: true
        useShortDoctype: true
        removeOptionalTags: true
        collapseWhitespace: true

    replace:
      frontend:
        src: 'dist/index.html'
        overwrite: true
        replacements: [{
          from: /<script>(.|[\r\n])*<\/script>/gm
          to: "<script><%= grunt.file.read('dist/require.js') %> require(['frontend/main']);</script>"
        }, {
          from: '<script src="/src/require.js"></script>'
          to: ''
        }]

    copy:
      frontend:
        files: [
          src: 'index.html'
          dest: 'dist/index.html'
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
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-requirejs'
  grunt.loadNpmTasks 'grunt-angular-translate'

  grunt.registerTask 'frontend:html', [
    'copy:frontend'
    'replace:frontend'
    'htmlmin:frontend'
  ]
  grunt.registerTask 'frontend', [
    'frontend:html'
    'requirejs:frontend'
    'uglify:frontend'
  ]
  grunt.registerTask 'backend', [
    'requirejs:backend'
    'uglify:backend'
  ]
  grunt.registerTask 'default', [
    'uglify:requirejs'
    'frontend'
    'backend'
  ]

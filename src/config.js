requirejs.config({
    packages: [{
        name: 'bz',
        location: 'bz',
        main: 'run'
    }, {
        name: 'bz/widgets',
        location: 'bz.widgets',
        main: 'run'
    }],
    paths: {
        'jquery': '../bower_components/jquery/jquery',
        // angular
        'angular': '../bower_components/angular/angular',
        'angular-resource': '../bower_components/angular-resource/angular-resource',
        'angular-route': '../bower_components/angular-route/angular-route',
        'angular-animate': '../bower_components/angular-animate/angular-animate',
        'angular-cookies': '../bower_components/angular-cookies/angular-cookies',
        'ngSocial': '../bower_components/angular-social/angular-social.src',
        'bzCommentArea': '../bower_components/angular-comment-area/angular-comment-area.src',
        'angular-route-segment': '../bower_components/angular-route-segment/build/angular-route-segment',
        'angular-file-upload': '../bower_components/angular-file-upload/angular-file-upload',
        'angular-smoothscroll': '../bower_components/angular-smoothscroll/dist/scripts/481c90be.scripts',

        'bz-nested-model': '../bower_components/bz-nested-model/bz-nested-model',

        // angular modules
        'angular-ui-select2': '../bower_components/angular-ui-select2/src/select2',
        'ng-ckeditor': '../bower_components/ng-ckeditor/ng-ckeditor.src',
        'ngTable': '../bower_components/ng-table/ng-table',
        'ngFinder': '../bower_components/ng-finder/ng-finder.src',

        // @todo temp
        //'bazalt-auth': '../bower_components/bazalt-auth/bazalt-auth',
        'bazalt-auth': '/bazalt-auth/src/bazalt-auth',
        //'bazalt-auth': '../bower_components/bazalt-auth/src/bazalt-auth',
        'blueimp-canvas-to-blob': '../bower_components/blueimp-canvas-to-blob/js/canvas-to-blob',
        'blueimp-tmpl': '../bower_components/blueimp-tmpl/js/tmpl',
        'speakingurl': '../bower_components/speakingurl/speakingurl.min',

        // bootstrap
        'bootstrap': '../bower_components/bootstrap/js',
        'bootstrap-datepicker': '../bower_components/bootstrap-datepicker/js/bootstrap-datepicker',
        'bootstrap-datepicker-locale': '../bower_components/bootstrap-datepicker/js/locales',
        'bootstrap-switch': '../bower_components/bootstrap-switch/static/js/bootstrap-switch',

        // etc
        'ckeditor': '../bower_components/ckeditor/ckeditor',
        'select2': '../bower_components/select2/select2',

        //jquery-galleria
        'jquery-galleria': '../bower_components/jquery-galleria/src/galleria',

        //jquery.sticky
        'jquery-sticky': '../bower_components/jquery.sticky/jquery.sticky',

        'fancybox': '../bower_components/fancybox/source/jquery.fancybox',

        // tests
        'jasmine': '../bower_components/jasmine/lib/jasmine-core'
    },
    shim: {
        'angular': { exports: 'angular' },//, deps: ['jquery'] },
        'angular-resource': { deps: ['angular'] },
        'angular-route': { deps: ['angular'] },
        'angular-animate': { deps: ['angular'] },
        'angular-cookies': { deps: ['angular'] },
        'ngSocial': { deps: ['angular'] },
        'angular-route-segment': { deps: ['angular', 'angular-route'] },
        'angular-smoothscroll': { deps: ['angular'] },
        'angular-file-upload': { deps: ['angular'] },
        'angular-ui-select2': { deps: ['angular', 'select2'] },

        'bz-nested-model': { deps: ['angular'] },

        'ng-ckeditor': { deps: ['angular', 'ckeditor'] },
        'ngTable': { deps: ['angular'] },
        'ngFinder': { deps: ['elfinder', 'angular'] },

        // Bootstrap
        'bootstrap/modal': { deps: ['bootstrap/transition'] },
        'bootstrap-datepicker-locale/bootstrap-datepicker.ru': { deps: ['bootstrap-datepicker'] }
    },
    priority: [
        'angular'
    ],
    urlArgs: 'v=1.1'
});
require.config({
    baseUrl: './js',

    packages: [{
        name: 'bz',
        location: '../../build',
        main: 'bz'
    }],

    paths: {
        'jquery': '../../bower_components/jquery/jquery',
        'jquery-ui': '../../bower_components/jquery-ui/ui',

        'angular': '../../bower_components/angular/angular',
        'angular-locale': 'http://code.angularjs.org/1.2.0-rc.3/i18n/angular-locale_uk-ua',

        'ng-editable-tree': '../../bower_components/ng-editable-tree/ng-editable-tree',
        'ngTable': '../../bower_components/ng-table/ng-table'
    },

    shim: {
        'angular': { exports: 'angular' },
        'angular-locale': { deps: ['angular'] },

        'ng-editable-tree': { deps: ['angular', 'jquery-ui/jquery.ui.draggable', 'jquery-ui/jquery.ui.droppable', 'jquery-ui/jquery.ui.sortable'] },
        'ngTable': { deps: ['jquery', 'angular'] },

        // jquery ui for sortable
        'jquery-ui/jquery.ui.core': { deps: ['jquery'] },
        'jquery-ui/jquery.ui.widget': { deps: ['jquery-ui/jquery.ui.core'] },
        'jquery-ui/jquery.ui.mouse': { deps: ['jquery-ui/jquery.ui.widget'] },
        'jquery-ui/jquery.ui.draggable': { deps: ['jquery-ui/jquery.ui.mouse'] },
        'jquery-ui/jquery.ui.droppable': { deps: ['jquery-ui/jquery.ui.mouse'] },
        'jquery-ui/jquery.ui.selectable': { deps: ['jquery-ui/jquery.ui.mouse'] },
        'jquery-ui/jquery.ui.sortable': { deps: ['jquery-ui/jquery.ui.mouse'] }
    }
});
require(['app']);
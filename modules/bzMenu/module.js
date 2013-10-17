define('modules/bzMenu/module', [
    'modules/bzMenu/app',

    'modules/bzMenu/directives/bootstrapToggle',
    'modules/bzMenu/directives/bzMenu'
], function(app) {
    'use strict';

    app.value('bzMenu.Types', []);
});
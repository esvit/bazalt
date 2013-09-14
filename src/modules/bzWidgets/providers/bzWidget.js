define('modules/bzWidgets/providers/bzWidget', [
    'modules/bzWidgets/app'
], function (app) {
    'use strict';

    app.provider('bzWidget', [function() {
        this.$get = function() { return {}; };
    }]);

});
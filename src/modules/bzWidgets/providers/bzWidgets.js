define('modules/bzWidgets/providers/bzWidgets', [
    'modules/bzWidgets/app'
], function(app) {
    'use strict';

    app.provider('bzWidgets', [function() {
        this.$widgets =[];

        this.add = function (widget) {
            this.$widgets.push(widget);
            return this;
        };

        this.$get = function() {
            var self = this;
            return {
                widgets: function () {
                    return self.$widgets;
                },
                widget: function(widgetId) {
                    for (var i = 0; i < self.$widgets.length; i++) {
                        if (self.$widgets[i].id == widgetId) {
                            return self.$widgets[i];
                        }
                    }
                    return null;
                }
            };
        };
    }]);

});
define([], function() {
    'use strict';

    if (!Array.prototype.filter) {
        Array.prototype.filter = function (callback) {
            var arr = [];
            callback = callback || function() {};
            for (var i = 0, count = this.length; i < count; i++) {
                if (callback(this[i])) {
                    arr.push(this[i]);
                }
            }
            return arr;
        };
    }

});
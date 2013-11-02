define(['bazalt-cms/helpers/filter', 'bazalt-cms/helpers/indexOf'], function() {
    'use strict';

    if (!Array.prototype.diff) {
        Array.prototype.diff = function (a) {
            return this.filter(function(i) {return !(a.indexOf(i) > -1);});
        };
    }

});
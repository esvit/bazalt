define('components/bcPages/factories/Category', [
    'components/bcPages/app'
], function(app) {
    'use strict';

    app.factory('bcPages.Factories.Category', ['ngNestedResource', 'bzConfig', function (ngNestedResource, bzConfig) {
        return ngNestedResource(bzConfig.resource('/pages/categories/:id'), { 'id': '@id' }, {});
    }]);

});
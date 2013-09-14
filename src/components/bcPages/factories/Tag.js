define('components/bcPages/factories/Tag', [
    'components/bcPages/app'
], function(app) {
    'use strict';

    app.factory('bcPages.Factories.Tag', ['$resource', 'bzConfig', function ($resource, bzConfig) {
        return $resource(bzConfig.resource('/pages/tags/:id'), { 'id': '@id' }, {
        });
    }]);

});
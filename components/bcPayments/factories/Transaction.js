define('components/bcPayments/factories/Transaction', [
    'components/bcPayments/app'
], function(app) {
    'use strict';

    app.factory('bcPayments.Factories.Transaction', ['$resource', 'bzConfig', function ($resource, bzConfig) {
        return $resource(bzConfig.resource('/payments/transaction/:id'), { 'id': '@id' }, {
        });
    }]);

});
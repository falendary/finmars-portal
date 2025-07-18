/**
 * Created by szhitenev on 10.12.2019.
 */
(function(){

    var reconciliationBankFieldRepository = require('../../repositories/reconciliation/reconciliationBankFieldRepository');

    var getList = function (options) {
        return reconciliationBankFieldRepository.getList(options);
    };

    var getByKey = function (id) {
        return reconciliationBankFieldRepository.getByKey(id);
    };

    var create = function(account) {
        return reconciliationBankFieldRepository.create(account);
    };

    var update = function(id, account) {
        return reconciliationBankFieldRepository.update(id, account);
    };

    var deleteByKey = function (id) {
        return reconciliationBankFieldRepository.deleteByKey(id);
    };

    module.exports = {
        getList: getList,
        getByKey: getByKey,
        create: create,
        update: update,
        deleteByKey: deleteByKey
    }

}());
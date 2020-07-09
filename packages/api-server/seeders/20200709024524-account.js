const STATUS = require('../utils/statusDict');
const TYPE = require('../utils/typeAccountDict');
module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Accounts', [{
      customer_id: 1,
      type: TYPE.DEFAULT,
      account_number: '1111111111111111',
      balance: 1000000,
      created_date: new Date(),
      status: STATUS.NORMAL,
    }, {
      customer_id: 2,
      type: TYPE.DEFAULT,
      account_number: '2222222222222222',
      balance: 2000000,
      created_date: new Date(),
      status: STATUS.NORMAL,
    }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Accounts', null, {});
  },
};

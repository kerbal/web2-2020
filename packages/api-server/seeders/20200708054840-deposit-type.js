

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('DepositTypes', [{
      interest_rate: 0.01,
      expiry_time: 3,
    }, {
      interest_rate: 0.03,
      expiry_time: 6,
    }, {
      interest_rate: 0.06,
      expiry_time: 12,
    }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('DepositTypes', null, {});
  },
};

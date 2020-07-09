const STATUS = require('../constants/customerStatus');
module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Customers', [{
      fullname: 'Test customer 1',
      birthday: '1/1/2020',
      phone_number: '111111111',
      // Pass is '111111'
      password: '$2b$10$kP3.ePWqDpmvuu2Gdu6SLOoudl/NYNMNbn8cMpLhMpoVG1kWERLQ2',
      email: 'huynonstop123nt@gmail.com',
      address: 'abcdef 111',
      status: STATUS.VERIFIED,
    }, {
      fullname: 'Test customer 2',
      birthday: '2/2/2020',
      phone_number: '222222222',
      // Pass is '111111'
      password: '$2b$10$kP3.ePWqDpmvuu2Gdu6SLOoudl/NYNMNbn8cMpLhMpoVG1kWERLQ2',
      email: 'tthuykh99@gmail.com',
      address: 'abcdef 222',
      status: STATUS.VERIFIED,
    }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Customers', null, {});
  },
};

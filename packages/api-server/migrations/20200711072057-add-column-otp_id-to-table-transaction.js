module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Transactions', 'otp_id', Sequelize.UUID);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Transactions', 'otp_id', Sequelize.UUID);
  },
};

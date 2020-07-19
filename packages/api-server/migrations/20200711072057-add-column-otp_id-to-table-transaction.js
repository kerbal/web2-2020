module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Transactions', 'otp_id', Sequelize.UUID);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropColumn('Transactions', 'otp_id', Sequelize.UUID);
  },
};

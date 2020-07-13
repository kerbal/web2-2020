module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('DepositAccounts', 'deposit_date', {
        type: Sequelize.DATE,
        allowNull: true,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('DepositAccounts', 'deposit_date', {
        type: Sequelize.DATE,
        allowNull: false,
      }),
    ]);
  },
};

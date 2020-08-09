module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Transactions', 'source_bank_id', { type: Sequelize.STRING }),
      queryInterface.addColumn('Transactions', 'source_bank_name', { type: Sequelize.STRING }),
      queryInterface.addColumn('Transactions', 'destination_bank_id', { type: Sequelize.STRING }),
      queryInterface.addColumn('Transactions', 'destination_bank_name', { type: Sequelize.STRING }),
      queryInterface.addColumn('Transactions', 'source_account_name', { type: Sequelize.STRING }),
      queryInterface.addColumn('Transactions', 'destination_account_name', { type: Sequelize.STRING }),
      queryInterface.addColumn('Transactions', 'source_account_number', { type: Sequelize.STRING }),
      queryInterface.addColumn('Transactions', 'destination_account_number', { type: Sequelize.STRING }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Transactions', 'source_bank_id', { type: Sequelize.STRING }),
      queryInterface.removeColumn('Transactions', 'source_bank_name', { type: Sequelize.STRING }),
      queryInterface.removeColumn('Transactions', 'destination_bank_id', { type: Sequelize.STRING }),
      queryInterface.removeColumn('Transactions', 'destination_bank_name', { type: Sequelize.STRING }),
      queryInterface.removeColumn('Transactions', 'source_account_name', { type: Sequelize.STRING }),
      queryInterface.removeColumn('Transactions', 'destination_account_name', { type: Sequelize.STRING }),
      queryInterface.removeColumn('Transactions', 'source_account_number', { type: Sequelize.STRING }),
      queryInterface.removeColumn('Transactions', 'destination_account_number', { type: Sequelize.STRING }),
    ]);
  },
};

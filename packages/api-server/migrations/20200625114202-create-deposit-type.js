module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('DepositTypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      interest_rate: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      expiry_time: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      removed: {
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('DepositTypes');
  },
};

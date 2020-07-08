'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customer_id: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        allowNull: false,
        references: {
          model: 'Customers',
          key: 'id'
        }
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      account_number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      balance: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      currency_unit: {
        defaultValue: "VND",
        type: Sequelize.STRING
      },
      created_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      closed_date: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Accounts');
  }
};
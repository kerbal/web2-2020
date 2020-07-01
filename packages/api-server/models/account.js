'use strict';
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    customer_id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    account_number: DataTypes.STRING,
    balance: DataTypes.FLOAT,
    currency_unit: DataTypes.STRING,
    created_date: DataTypes.DATE,
    closed_date: DataTypes.DATE,
    status: DataTypes.STRING
  }, {});
  Account.associate = function (models) {
    // associations can be defined here
    Account.belongsTo(models.Customer, {
      foreignKey: "customer_id"
    })
  };
  return Account;
};
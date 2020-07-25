module.exports = (sequelize, DataTypes) => {
  const DepositAccount = sequelize.define('DepositAccount', {
    account_id: DataTypes.INTEGER,
    type_id: DataTypes.INTEGER,
    deposit_date: DataTypes.DATE,
  }, {});
  DepositAccount.associate = function (models) {
    // associations can be defined here
    DepositAccount.belongsTo(models.DepositType, {
      foreignKey: 'type_id',
      as: 'depositType',
    });
    DepositAccount.belongsTo(models.Account, {
      foreignKey: 'account_id',
    });
  };
  return DepositAccount;
};

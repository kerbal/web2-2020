module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    bank_id: DataTypes.INTEGER,
    bank_name: DataTypes.STRING,
    source_bank_id: DataTypes.STRING,
    source_bank_name: DataTypes.STRING,
    destination_bank_id: DataTypes.STRING,
    destination_bank_name: DataTypes.STRING,
    source_account_id: DataTypes.INTEGER,
    source_account_name: DataTypes.STRING,
    destination_account_id: DataTypes.INTEGER,
    destination_account_name: DataTypes.STRING,
    balance: DataTypes.FLOAT,
    amount: DataTypes.FLOAT,
    note: DataTypes.STRING,
    status: DataTypes.STRING,
    error_message: DataTypes.STRING,
    otp_id: DataTypes.UUID,
  }, {});
  Transaction.associate = function (models) {
    // associations can be defined here
    Transaction.belongsTo(models.Account, {
      as: 'source_account',
      foreignKey: 'source_account_id',
    });
    Transaction.belongsTo(models.Account, {
      as: 'destination_account',
      foreignKey: 'destination_account_id',
    });
  };
  return Transaction;
};

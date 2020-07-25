module.exports = (sequelize, DataTypes) => {
  const DepositType = sequelize.define('DepositType', {
    interest_rate: DataTypes.FLOAT,
    expiry_time: DataTypes.INTEGER,
    removed: DataTypes.BOOLEAN,
  }, {});
  DepositType.associate = function (models) {
    // associations can be defined here
    DepositType.hasMany(models.DepositAccount, {
      foreignKey: 'type_id',
      as: 'depositType',
    });
  };
  return DepositType;
};

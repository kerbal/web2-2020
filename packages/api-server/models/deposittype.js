'use strict';
module.exports = (sequelize, DataTypes) => {
  const DepositType = sequelize.define('DepositType', {
    interest_rate: DataTypes.FLOAT,
    expiry_time: DataTypes.INTEGER,
    removed: DataTypes.BOOLEAN
  }, {});
  DepositType.associate = function (models) {
    // associations can be defined here
  };
  return DepositType;
};
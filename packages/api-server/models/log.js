
module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('Log', {
    data: DataTypes.JSON,
  }, {});
  Log.associate = function () {
    // associations can be defined here
  };
  return Log;
};

module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    fullname: DataTypes.STRING,
    birthday: DataTypes.DATE,
    phone_number: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    removed: DataTypes.BOOLEAN,
  }, {});
  Admin.associate = function () {
    // associations can be defined here
  };
  return Admin;
};

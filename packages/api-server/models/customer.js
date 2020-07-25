module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    fullname: DataTypes.STRING,
    birthday: DataTypes.DATE,
    phone_number: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    status: DataTypes.STRING,
    resetPasswordToken: DataTypes.STRING,
  }, {});
  Customer.associate = function () {
    // associations can be defined here
  };
  return Customer;
};

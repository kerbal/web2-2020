'use strict';
module.exports = (sequelize, DataTypes) => {
  const Identity = sequelize.define('Identity', {
    customer_id: DataTypes.INTEGER,
    pid: DataTypes.STRING,
    create_date: DataTypes.DATE,
    location: DataTypes.STRING,
    front_image: DataTypes.STRING,
    back_image: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  Identity.associate = function (models) {
    // associations can be defined here
    Identity.belongsTo(models.Customer, {
      foreignKey: "customer_id"
    })
  };
  return Identity;
};
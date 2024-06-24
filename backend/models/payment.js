'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Payment.belongsToMany(models.User,{
        through:"UserPayment",
        foreignKey:"user_id"
      })
    }
  }
  Payment.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Payment',
    tableName:'Payment'
  });
  return Payment;
};
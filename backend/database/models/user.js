'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasOne(models.Reservation, {
                foreignKey: 'user',
                sourceKey: 'account_id',
            })
            this.hasOne(models.Review, {
                foreignKey: 'user',
                sourceKey: 'account_id',
            })
        }
    }
    User.init(
        {
            name: DataTypes.STRING,
            password: DataTypes.STRING,
            account_id: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'User',
        },
    )
    return User
}

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
                foreignKey: 'account_id',
                sourceKey: 'account_id',
            })
            this.hasOne(models.Review, {
                foreignKey: 'account_id',
                sourceKey: 'account_id',
            })
        }
    }
    User.init(
        {
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            username: DataTypes.STRING,
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

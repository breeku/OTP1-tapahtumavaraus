'use strict'
const { Model } = require('sequelize')
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcryptjs')
const { SALTROUNDS } = require('../../config/index')

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
            email: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'User',
        },
    )

    User.beforeCreate(async (user, options) => {
        const account_id = uuidv4()
        console.log(account_id)
        user.account_id = account_id

        const hashedPassword = await bcrypt.hash(user.password, SALTROUNDS)
        console.log(hashedPassword)
        user.password = hashedPassword
    })
    return User
}

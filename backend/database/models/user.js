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
            this.hasMany(models.Reservation, {
                foreignKey: 'account_id',
                sourceKey: 'account_id',
            })
            this.hasMany(models.Review, {
                foreignKey: 'account_id',
                sourceKey: 'account_id',
            })
        }
    }

    User.init(
        {
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            account_id: {
                type: DataTypes.STRING,
                unique: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
        },
        {
            defaultScope: {
                attributes: { exclude: ['password'] },
            },
            scopes: {
                withPassword: {
                    attributes: {},
                },
            },
            sequelize,
            modelName: 'User',
        },
    )

    User.beforeCreate(async (user, options) => {
        const account_id = uuidv4()
        user.account_id = account_id

        const hashedPassword = await bcrypt.hash(user.password, SALTROUNDS)
        user.password = hashedPassword
    })
    return User
}

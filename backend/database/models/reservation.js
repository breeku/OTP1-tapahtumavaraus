'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Reservation extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Event, {
                foreignKey: 'event_id',
                targetKey: 'event_id',
            })
            this.belongsTo(models.User, {
                foreignKey: 'account_id',
                targetKey: 'account_id',
            })
        }
    }
    Reservation.init(
        {
            event_id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            account_id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Reservation',
        },
    )
    return Reservation
}

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
                targetKey: 'user',
            })
        }
    }
    Reservation.init(
        {
            event_id: DataTypes.STRING,
            user: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Reservation',
        },
    )
    return Reservation
}

'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Event extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasOne(models.Reservation, {
                foreignKey: 'event_id',
                sourceKey: 'event_id',
            })
            this.hasOne(models.Review, {
                foreignKey: 'event_id',
                sourceKey: 'event_id',
            })
        }
    }
    Event.init(
        {
            event_id: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Event',
        },
    )
    return Event
}
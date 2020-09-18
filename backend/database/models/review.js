'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Review extends Model {
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
        }
    }
    Review.init(
        {
            event_id: DataTypes.STRING,
            rating: DataTypes.INTEGER,
            user: DataTypes.STRING,
            header: DataTypes.STRING,
            content: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Review',
        },
    )
    return Review
}

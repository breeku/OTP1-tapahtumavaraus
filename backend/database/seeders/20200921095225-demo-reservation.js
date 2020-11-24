'use strict'
const db = require('../models/index')

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await db.Reservation.bulkCreate(
            [
                {
                    event_id: 'helsinki:afyho6epwy',
                    ...(await db.User.findOne({
                        where: { username: 'Santeri' },
                        raw: true,
                        attributes: ['account_id'],
                    })),
                },
                {
                    event_id: 'helsinki:afyho6epwy',
                    ...(await db.User.findOne({
                        where: { username: 'Samperi' },
                        raw: true,
                        attributes: ['account_id'],
                    })),
                },
                {
                    event_id: 'helmet:213176',
                    ...(await db.User.findOne({
                        where: { username: 'Santeri' },
                        raw: true,
                        attributes: ['account_id'],
                    })),
                },
                {
                    event_id: 'helmet:213176',
                    ...(await db.User.findOne({
                        where: { username: 'Samperi' },
                        raw: true,
                        attributes: ['account_id'],
                    })),
                },
            ],
            {},
        )
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Reservations', null, {})
    },
}

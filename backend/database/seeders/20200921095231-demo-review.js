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
        await db.Review.bulkCreate(
            [
                {
                    event_id: 'helsinki:afyho6epwy',
                    rating: 5,
                    ...(await db.User.findOne({
                        where: { username: 'Santeri' },
                        raw: true,
                        attributes: ['account_id'],
                    })),
                    header: 'Tää o headeri',
                    content: 'Tää o kontent',
                },
                {
                    event_id: 'helsinki:afyho6epwy',
                    rating: 4,
                    ...(await db.User.findOne({
                        where: { username: 'Samperi' },
                        raw: true,
                        attributes: ['account_id'],
                    })),
                    header: 'Hederi',
                    content: 'Konontti',
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
        await queryInterface.bulkDelete('Reviews', null, {})
    },
}

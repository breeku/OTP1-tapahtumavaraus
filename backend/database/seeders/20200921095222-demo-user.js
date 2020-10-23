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
        await db.User.bulkCreate(
            [
                {
                    first_name: 'Santeri',
                    last_name: 'Virtanen',
                    username: 'Santeri',
                    password: '12345',
                    email: 'aaa@email.com',
                },
                {
                    first_name: 'Samperi',
                    last_name: 'Virkanen',
                    username: 'Samperi',
                    password: '54321',
                    email: 'bbb@email.com',
                },
            ],
            { individualHooks: true, validate: true },
        )
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Users', null, {})
    },
}

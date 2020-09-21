'use strict'

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
        await queryInterface.bulkInsert(
            'Reviews',
            [
                {
                    event_id: 'kulke:51323',
                    rating: 5,
                    user: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
                    header: 'Tää o headeri',
                    content: 'Tää o kontent',
                    createdAt: new Date(),
                    updatedAt: new Date(),
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

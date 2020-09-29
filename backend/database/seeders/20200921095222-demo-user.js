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
            'Users',
            [
                {
                    first_name: 'Santeri',
                    last_name: 'Virtanen',
                    username: 'Santeri',
                    password:
                        '$2y$10$ab87RyK1MCuhnhDcngIPM.L0BZ/mDn2pqoYTa8dQUC9a.pL7115Sy',
                    email: 'aaa@email.com',
                    account_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    first_name: 'Samperi',
                    last_name: 'Virkanen',
                    username: 'Samperi',
                    password:
                        '$2y$10$Av1s9odZrucKxByW66mevulz9thEwBkwjEc0WS6zsZet475eZaQ1e',
                    email: 'bbb@email.com',
                    account_id: 'a2192c1d-df09-4690-beeb-b10c0db8ba29',
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
        await queryInterface.bulkDelete('Users', null, {})
    },
}

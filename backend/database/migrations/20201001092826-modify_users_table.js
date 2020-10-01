'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.changeColumn('Users', 'email', {
            type: Sequelize.STRING,
            unique: true,
        })
        await queryInterface.changeColumn('Users', 'username', {
            type: Sequelize.STRING,
            unique: true,
        })
        await queryInterface.changeColumn('Users', 'account_id', {
            type: Sequelize.STRING,
            unique: true,
        })
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.changeColumn('Users', 'email', {
            type: Sequelize.STRING,
        })
        await queryInterface.changeColumn('Users', 'username', {
            type: Sequelize.STRING,
        })
        await queryInterface.changeColumn('Users', 'account_id', {
            type: Sequelize.STRING,
        })
    },
}

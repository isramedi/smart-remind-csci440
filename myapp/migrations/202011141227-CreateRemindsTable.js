'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Reminds', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      category: {
        allowNull: true,
        type: Sequelize.STRING
      },
      title: {
        allowNull: true,
        type: Sequelize.STRING
      },
      notes: {
        allowNull: true,
        type: Sequelize.STRING
      },
      dateOfRemind: {
        allowNull: true,
        type: Sequelize.DATE
      },
      type: {
      	allowNull: true,
      	type: Sequelize.STRING
      },
      urgency: {
      	allowNull: true,
      	type: Sequelize.STRING
      },
      expired: {
      	allowNull: true,
      	type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      users_id: {
      	type: Sequelize.UUID,
        references: {
              model: {
                  tableName: 'Users',
                  schema: 'public'
              },
              key: 'id'
        },
        allowNull: false
      },
      groups_id: {
      	type: Sequelize.UUID,
        references: {
              model: {
                  tableName: 'Groups',
                  schema: 'public'
              },
              key: 'id'
        },
        allowNull: false
      },
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Reminds');
  }
};
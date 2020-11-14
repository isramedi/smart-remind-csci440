'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('usersGroupsRelation', {
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
      UserId: {
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
      GroupId: {
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
    return queryInterface.dropTable('usersGroupsRelation');
  }
};

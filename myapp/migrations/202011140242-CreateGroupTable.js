'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Groups', {
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
      groupname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      creator_id: {
        allowNull: true,
        type: Sequelize.UUID
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
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Groups');
  }
};

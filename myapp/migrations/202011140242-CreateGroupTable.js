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
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      creator_id: {
        allowNull: true,
        type: Sequelize.UUID
      },
      //UserId: {
      //	type: Sequelize.UUID,
      //  references: {
      //        model: {
      //            tableName: 'Users',
      //            schema: 'smart_remind_schema'
      //        },
      //        key: 'id'
      //  },
      //  allowNull: true
      //},
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Groups');
  }
};

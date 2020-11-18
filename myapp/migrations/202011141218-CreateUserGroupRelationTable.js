'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('userGroupRelations', {
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
      //GroupId: {
      //	type: Sequelize.UUID,
      //  references: {
      //        model: {
      //            tableName: 'Groups',
      //            schema: 'smart_remind_schema'
      //        },
      //        key: 'id'
      //  },
      //  allowNull: true
      //},
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('userGroupRelations');
  }
};
